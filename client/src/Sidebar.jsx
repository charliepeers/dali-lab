import React from "react";
import './Sidebar.css';
import { PiBird } from "react-icons/pi";
import { GiNestBirds } from "react-icons/gi"; //only load icons that I need = improves page speed 
import { HiOutlineHashtag } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5"; 
import SidebarSec from "./SidebarSec";
import { useAuth } from "./AuthContext";

function Sidebar({ currentUser, currentPage, setCurrentPage }) {
  const { logout } = useAuth();

  return (
    <div className="sidebar"> 
      
      <div className="sidebar__logo">
        <PiBird />
        <span> Dalibird</span>
      </div>

      {/*home*/}
      <div onClick={() => setCurrentPage('feed')}>
        <SidebarSec 
          active={currentPage === 'feed'} 
          Icon={GiNestBirds} 
          text="Home"
        />
      </div>

      {/*explore*/}
      <div onClick={() => setCurrentPage('explore')}>
        <SidebarSec 
          active={currentPage === 'explore'} 
          Icon={HiOutlineHashtag} 
          text="Explore"
        />
      </div>

      {/* User Section */}
      <div className="sidebar__user">
        
        {currentUser?.picture ? (
          <img 
            className="sidebar__userAvatar"
            src={currentUser.picture} 
            alt={currentUser.name} 
          />
        ) : (
          <div className="sidebar__userInfo">
            <p className="sidebar__userName">{currentUser?.name || 'User'}</p>
            <p className="sidebar__userEmail">{currentUser?.email}</p>
          </div>
        )}

        {/* Logout Button */}
        <button 
          className="sidebar__logoutButton" 
          onClick={logout}
          title="Log out"
        >
          <IoLogOutOutline size={20} />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;