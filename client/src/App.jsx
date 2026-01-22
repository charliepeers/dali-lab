import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar.jsx';
import Feed from './Feed.jsx';
import RightSidebar from './RightSidebar.jsx';
const API_URL = 'http://localhost:3000/api'


function App() {
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);

//fetch data from backend
  useEffect(() => {
    async function fetchData() {
      try {
        //gets all dali members
        const membersResponse = await fetch(`${API_URL}/members`);
        const membersData = await membersResponse.json();
        setMembers(membersData);

        //gets all posts
        const postsResponse = await fetch(`${API_URL}/posts`);
        const postsData = await postsResponse.json();
        setPosts(postsData);

      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    fetchData();
  },[]);

  //make new post
  const handleCreatePost = async (content) => {
    if (!content.trim()) return;
    
    try {
      await fetch(`${API_URL}/members/0/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
    
      const postsResponse = await fetch(`${API_URL}/posts`);
      const postsData = await postsResponse.json();
      setPosts(postsData);

    } catch(err) {
      console.error('Error creating:post:' , err);
    }
  };
  

  return (
    <div className="app">
      <Sidebar />
      
      <Feed 
        posts={posts}
        onCreatePost={handleCreatePost}
        members={members}/>
      
      <RightSidebar 
        members={members}/>
      

    </div>
  );
}

export default App;