import React from 'react';
import './RightSidebar.css';
import { IoSearchSharp } from "react-icons/io5";

function RightSidebar({ members, setCurrentPage, searchQuery, setSearchQuery }) {
  const suggestedUsers = members.slice(0, 3);

  const handlePersonClick = () => {
    setCurrentPage('explore');
  };

  //search handle
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setCurrentPage('explore');
    }
  };

  return (
    <div className="rightSidebar">
      <div className="rightSidebar__searchContainer">
        <IoSearchSharp className="rightSidebar__searchIcon" size={16} />
        <input 
        className="rightSidebar__search" 
        placeholder="Search Dalibird" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}/>
      </div>

      <div className="rightSidebar__card">
        <h2 className="rightSidebar__cardTitle">You may like</h2>

        {suggestedUsers.map((user, index) => (
          <div key={index}>
            <div className="rightSidebar__divider"></div>
            <div className="rightSidebar__profile" onClick={handlePersonClick}>
              <div className="rightSidebar__profilePic">
                {user.picture ? (
                  <img 
                    src={user.picture} 
                    alt={user.name}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none"> //made simple grey default avatar if they have no profile picture
                    <circle cx="12" cy="12" r="12" fill="#ccc"></circle>
                  </svg>
                )}
              </div>
              <div className="rightSidebar__profileInfo">
                <span className="rightSidebar__displayName">{user.name}</span>
                <span className="rightSidebar__userName">@{user.name.toLowerCase().replace(' ', '')}</span>
              </div>

            
              <button
                className="rightSidebar__seeMoreButton"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent double-click
                  handlePersonClick();
                }}
              >
                See More
              </button>
            </div>
          </div>
        ))}

        <div className="rightSidebar__divider"></div>
        <button className= "rightSidebar__showMore" onClick={() => setCurrentPage('explore')}
        >Show more</button>
      </div>
    </div>
  );
}

export default RightSidebar;