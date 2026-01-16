const express = require('express');
const app = express();  
const cors = require('cors');
const PORT = 3000;
const members = require('./dali_social_media.json');

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

app.get('/api/members/role/:role')

//start Server
app.listen(
  PORT,
  () => { console.log(`it's live on http://localhost:${PORT}`);
}
);
