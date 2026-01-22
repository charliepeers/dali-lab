import React, { useState } from 'react';
import './Post.css';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa"; //change the icon depending if liked or not

function Post({ displayName, userName, text, likes, avatar, timestamp, postId, memberId }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  //could add debouncing here to prevent spam click and reduce unnecessary API calls. Can come back if I have more time 
  const handleLike = async () => {
    setLiked(!liked);
    
    if (!liked) {
      setLikeCount(likeCount + 1);
      console.log("Saving Like");
    } else {
      setLikeCount(likeCount - 1);
      console.log("Removing Like");
    }

    try {
      await fetch(`http://localhost:3000/api/members/${memberId}/posts/${postId}/like`, {
        method: 'POST'
      });
    } catch (error) {
      console.log('Error liking post:', error);
    }
  };

  return (
    <div className="post">
      <div className="post__avatar">
        {avatar && (
          <img 
            src={avatar} 
            alt={displayName}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {displayName}{" "}
              <span className="post__headerSpecial">
                {userName} · {formatTime(timestamp)}
              </span>
            </h3>
          </div>
          <div className="post__content">
            <p>{text}</p>
          </div>
          <div className="post__footer">
            <div 
              className={`post__likeButton ${liked ? 'post__likeButton--liked' : ''}`} 
              onClick={handleLike}
            >
              {liked ? <FaHeart size={18} /> : <CiHeart size={18} />}
              <span>{likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;