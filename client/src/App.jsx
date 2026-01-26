import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar.jsx';
import Feed from './Feed.jsx';
import RightSidebar from './RightSidebar.jsx';
import LoginSignup from './LoginSignup.jsx';
import { useAuth } from './AuthContext';
import Explore from './Explore.jsx';

const API_URL = 'http://localhost:3000/api'

function App() {
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  //shows which page you are on
  const [currentPage, setCurrentPage] = useState('feed');
  const { isAuthenticated, user, token, loading } = useAuth();

  //fetch from backend 
  useEffect(() => {
    async function fetchData() {
      try {
        const membersResponse = await fetch(`${API_URL}/members`);
        const membersData = await membersResponse.json();
        setMembers(membersData);

        const postsResponse = await fetch(`${API_URL}/posts`);
        const postsData = await postsResponse.json();
        setPosts(postsData);

      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    fetchData();
  }, []);

  // Make new post
  const handleCreatePost = async (content) => {
    if (!content.trim()) return;
    
    if (!isAuthenticated || !user) {
      alert('Please log in to create posts');
      return;
    }
    
    try {
      await fetch(`${API_URL}/members/${user.id}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });
    
      const postsResponse = await fetch(`${API_URL}/posts`);
      const postsData = await postsResponse.json();
      setPosts(postsData);

    } catch(err) {
      console.error('Error making post:', err);
    }
  };

  //if not login show log in
  if (!isAuthenticated) {
    return <LoginSignup />;
  }

  //main
  return (
    <div className="app">
      <Sidebar 
        currentUser={user}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} 
      />
      
      {/*proper conditional rendering*/}
      {currentPage === 'feed' ? (
        <Feed 
          posts={posts}
          onCreatePost={handleCreatePost}
          members={members}
          currentUser={user}
        />
      ) : (
        <Explore
        members={members}
        searchQuery={searchQuery} />
      )}
      
      <RightSidebar members={members}
      setCurrentPage={setCurrentPage} 
      searchQuery={searchQuery} 
      setSearchQuery={setSearchQuery} 
      />
    </div>
  );
}

export default App;