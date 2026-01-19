import React from 'react';
import './App.css';
import Sidebar from './Sidebar.jsx';
import Feed from './Feed.jsx';
import RightSidebar from './RightSidebar.jsx';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Feed />
      <RightSidebar />

      
    </div>
  );
}

export default App;