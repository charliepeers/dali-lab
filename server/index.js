require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();  
const cors = require('cors');
const PORT = 3000;
const members = require('./dali_social_media.json');
const fs = require('fs'); 
const jwt = require('jsonwebtoken');

//there is no fallback here on purpose (could have done || with a hardcoded key as a fallback) instead this forces proper config + more secure
const JWT_SECRET = process.env.JWT_SECRET;

//helps debug
if (!JWT_SECRET) {
  console.error('JWT_SECRET not found in .env file');
  process.exit(1);
}

//middleware
app.use(cors());
app.use(express.json());

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  //check to see if the token exists
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        //for API using session storage send a 401 status instead of a redirect
        res.status(401).json({ error: 'Unauthorized' });
      } else {
        console.log(decodedToken);
        req.user = decodedToken;
        next();
      }
    });
  } else {
    //if no token provided
    res.status(401).json({ error: 'no token provided' });
  }
};

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, year } = req.body; //get the data that the user put in data form

    if (!name || !email || !password || !year) {
      return res.status(400).json({ error: 'All fields are required' }); //check to see if not blank
    }

    const hashedPassword = await bcrypt.hash(password, 5); //make sure to scramble the password (done 5 times)

    //new user object
    const newUser = {
      id: members.length, 
      name,
      email,
      password: hashedPassword, //not storing the real one instead the hashed version 
      year: year,
      picture: '',
      posts: [],
      developer: false,
      designer: false,
      pm: false,
      mentor: false
    };

    //then need to overwrite JSON file
    members.push(newUser); 
    fs.writeFileSync('./dali_social_media.json', JSON.stringify(members, null, 2));

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '24h' } //expires in 24 hours, after researched found that they often expire after 5-15 minutes
    );

    const dataToSend = { //spec. pick what I want to send
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
  };
  res.status(201).json({ token, user: dataToSend });
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

  //login
  app.post('/api/auth/login', async (req, res) => {
    try {
    const { email, password } = req.body;

    //find user
    const user = members.find(m => m.email === email);
    if (!user) return res.status(401).json({ error: 'invalid' });

    //compare the passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    //create new token
    const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '24h' }
    );

    const dataToSend = { //spec. pick what I want to send
    id: user.id,
    name: user.name,
    email: user.email
  };
  res.json({ token, user: dataToSend });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

//get all dali members 
app.get('/api/members', (req, res) => { //updated so that they don't back password
  const membersWithoutPasswords = members.map(({ password, ...member }) => member);
  res.json(membersWithoutPasswords);
});

//get one member name
app.get('/api/members/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < members.length) {
    const { password, ...memberWithoutPassword } = members[id];
    res.json(memberWithoutPassword);
  } else {
    res.status(404).json({ message: 'Member not found.' });
  }
});

//searches by role
app.get('/api/members/role/:role', (req, res) => {
  const role = req.params.role; 
  const filtered = members.filter(member => member[role] === true);
  res.json(filtered);
});

//searches by year
app.get('/api/members/year/:year', (req, res) => {
  const year = req.params.year;
  const filtered = members.filter(member => member.year === year);
  res.json(filtered);
});

//searches by name
app.get('/api/members/search/:name', (req, res) => {
  const searchName = req.params.name.toLowerCase();
  const filtered = members.filter(member => 
    member.name.toLowerCase().includes(searchName)
  );
  res.json(filtered);
});

//protected routes(below)
//create post for each member
app.post('/api/members/:id/posts', requireAuth, (req, res) => { //updated to require auth
  const id = parseInt(req.params.id);
  const { content } = req.body;
  
  //checks to see either content is missing or member does not exist
  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'Cannot be blank' });
  }
  
  if (id < 0 || id >= members.length) {
    return res.status(404).json({ error: 'Member was not found' });
  }
  
  //create the post
  const newPost = {
    id: Date.now(),
    content: content,
    timestamp: new Date().toISOString(),
    likes: 0
  };
  
  members[id].posts.push(newPost);
  
  //save to dali json file (2 space indentation for readability)
  fs.writeFileSync('./dali_social_media.json', JSON.stringify(members, null, 2));
  
  res.status(201).json(newPost);
});

//get all the posts from all members
app.get('/api/posts', (req, res) => {
  const allPosts = [];
  
  members.forEach((member, index) => {
    member.posts.forEach(post => {
      const combinedPost = {
        id: post.id, 
        content: post.content, //what's written inside
        timestamp: post.timestamp, //the time it was post, more readable data string
        likes: post.likes, //num. of likes 
        author: member.name,  //name of person who posted it
        memberId:index 
      };
      allPosts.push(combinedPost);
    });
  });  
  
  //newest posts go first in the feed
  allPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  res.json(allPosts);
});

//creating the like route (find member, then find post, increase likes, save member array and finally send back the updated post)
app.post('/api/members/:memberId/posts/:postId/like', (req, res) => {
  const memberId = parseInt(req.params.memberId);
  const postId = parseInt(req.params.postId);

  const member = members[memberId];
  const post = member.posts.find(p => p.id === postId);
  post.likes++;
  fs.writeFileSync('./dali_social_media.json', JSON.stringify(members,null,2));

  res.json(post);
});

//get all posts for a specific member. first need to find the member then I can return all there posts
app.get('/api/members/:id/posts', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (id < 0 || id >= members.length) {
    return res.status(404).json({ error: 'Member was not found' });
  }
  
  const member = members[id];
  
  res.json(member.posts);
});

//start Server
app.listen(
  PORT,
  () => { console.log(`it's live on http://localhost:${PORT}`);
});