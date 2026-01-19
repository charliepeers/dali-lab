import React from "react";
import './Sidebar.css'
import { Home, Hash, Bell } from "lucide-react";
import SidebarSec from "./SidebarSec.jsx";

function Sidebar(){
  return(
  <div className="sidebar">
    <SidebarSec active Icon={Home} text="Home"/>
    <SidebarSec Icon={Hash}  text="Explore"/>
    <SidebarSec Icon={Bell} text="Notifications"/>
  </div>
);
}

export default Sidebar;

