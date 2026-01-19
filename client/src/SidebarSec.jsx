import React from 'react'
import './SidebarSec.css';

function SidebarSec({text, Icon}) {
  return (
    <div className="sidebarSec">
      <Icon className ="sidebarIcon" />
      <h2>{text}</h2>
      
    </div>
  )
}

export default SidebarSec; 