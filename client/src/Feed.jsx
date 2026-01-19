import React from 'react';
import './Feed.css';
import Peepbox from './Peepbox';

function Feed() {
  return (
    <div className = "feed">

      <div className="feedHeader">
        <h2>Home</h2>
      </div>
      {/* Header */}

      {/* Tweet */}
      <Peepbox  />

      {/* Post */}


  </div>
  );
}

export default Feed;