import React from "react";
import './Feed.css';
import Peepbox from './Peepbox';
import Post from './Post';

function Feed({ posts, members, onCreatePost, currentUser, onLikePost }) {
  const getMemberByName = (name) => {
    return members.find(m => m.name === name);
  }

  return (
    <div className = "feed">

      <div className="feedHeader">
        <h2 className="homeTitle">Home</h2>
      </div>
      {/* Header */}

      {/* Tweet */}
      <Peepbox onCreatePost={onCreatePost} 
      currentUser={currentUser}/> {/*pass current user*/}

      {/* Post */}
      {posts.map((post) => {
        const member = getMemberByName(post.author);
        return (
          <Post
            key={post.id}
            id={post.id}
            memberId={post.memberId} 
            postId={post.id}
            displayName={post.author}
            userName={`@${post.author.toLowerCase().replace(/\s/g, '')}`}
            text={post.content}
            timestamp={post.timestamp}
            likes={post.likes}
            avatar={member?.picture || ''}
          />
        );
      })}
    </div>
  );
}

export default Feed;