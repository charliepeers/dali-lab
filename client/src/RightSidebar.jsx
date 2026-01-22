import React, {useState, useEffect} from 'react';
import './RightSidebar.css';
import { IoSearchSharp } from "react-icons/io5";

function RightSidebar({ members }) {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [following, setFollowing] = useState({});
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  const fetchSuggestedUsers = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/members');
      const data = await res.json();
      setSuggestedUsers(data.slice(0, 3)); //get first three users
    } catch (error) {
      console.log('Error fetching suggested users:', error);
    }
  };
  fetchSuggestedUsers();
  }, []);

  //need to add api call here to persist the follow status to the db
  //tested the whole file works
  const followUnfollow = (name) => {
    setFollowing(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <div className="rightSidebar">
      <div className="rightSidebar__searchContainer">
        <IoSearchSharp className="rightSidebar__searchIcon" size={16} />
        <input className="rightSidebar__search" placeholder="Search Dalibird" />
      </div>

      <div className="rightSidebar__card">
        <h2 className="rightSidebar__cardTitle">You may like</h2>

        {suggestedUsers.map((user, index) => (
          <div key={index}>
            <div className="rightSidebar__divider"></div>
            <div className="rightSidebar__profile">
              <div className="rightSidebar__profilePic">
                {user.picture ? (
                  <img 
                    src={user.picture} 
                    alt={user.name}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none"> //made simple grey default avatar if they have no profile picture
                    <circle cx="12" cy="12" r="12" fill="#ccc"></circle>
                  </svg>
                )}
              </div>
              <div className="rightSidebar__profileInfo">
                <span className="rightSidebar__displayName">{user.name}</span>
                <span className="rightSidebar__userName">@{user.name.toLowerCase().replace(' ', '')}</span>
              </div>
              <button
                className={`rightSidebar__followButton ${following[user.name] ? 'followed' : ''}`}
                onClick={() => followUnfollow(user.name)}
              >
                {following[user.name] ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          </div>
        ))}

        <div className="rightSidebar__divider"></div>
        <a href="#" className="rightSidebar__showMore">Show more</a>
      </div>
    </div>
  );
}

export default RightSidebar;