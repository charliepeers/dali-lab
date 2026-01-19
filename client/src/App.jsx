import React from 'react';
import './App.css';
import Sidebar from './Sidebar.jsx';
import Feed from './Feed.jsx';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Feed />
    </div>
  );
}

export default App;