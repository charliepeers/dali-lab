const express = require('express');
const app = express();  
const cors = require('cors');
const PORT = 3000;
const members = require('./dali_social_media.json');
const fs = require('fs'); 

//middleware
app.use(cors());
app.use(express.json());

//get all dali members
app.get('/api/members', (req, res) => {
  res.json(members);
});

//get one member name
app.get('/api/members/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < members.length) {
    res.json(members[id]);
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

//create a new member 
app.post('/api/members', (req, res) => {
  const newMember = req.body;

  //want to validate that the data being sent is useful for the json file and not random
  if (!newMember.name || newMember.name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' });
  };
  
  if (!newMember.year || isNaN(newMember.year)) {
    return res.status(400).json({ error: 'Year must be a number' });
  }


  members.push(newMember);


  //even though the array is updated need to reflect those changes in the json file
  const fs = require('fs')
  fs.writeFileSync('./dali_social_media.json', JSON.stringify(members, null, 2));
  
  //confirming that new member was added succesfully
  res.status(201).json(newMember);
});

//setting up adding a post
app.get('/api/setup-posts', (req, res) => {
  members.forEach(member => {
    if (!member.posts) {
      member.posts = [];
    }
  });
  
  fs.writeFileSync('./dali_social_media.json', JSON.stringify(members, null, 2));
  res.json({ message: 'Posts array has been added' });
});


//create post for each member
app.post('/api/members/:id/posts', (req, res) => {
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
  
  members.forEach(member => {
    member.posts.forEach(post => {
      const combinedPost = {
        id: post.id, // milliseconds since midnight 01/01/1970
        content: post.content, //what's written inside
        timestamp: post.timestamp, //the time it was post, more readable data string
        likes: post.likes, //num. of likes 
        author: member.name //name of person who posted it
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
}
)
