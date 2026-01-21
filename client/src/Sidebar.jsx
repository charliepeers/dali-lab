import React from "react";
import './Sidebar.css'
import { PiBird} from "react-icons/pi"; //only load icons that I need = improves page speed 
import { GiNestBirds } from "react-icons/gi";
import { HiOutlineHashtag } from "react-icons/hi";
import SidebarSec from "./SidebarSec.jsx";

function Sidebar(){
  return(
  <div className="sidebar">
    <div className="sidebar__logo">
      <PiBird /><span> Dalibird</span></div>

    <SidebarSec active Icon={GiNestBirds} text="Home"/>
    <SidebarSec Icon={HiOutlineHashtag} text="Explore"/>
  </div>
);
}

export default Sidebar;

