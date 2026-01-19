import React from 'react'
import './SidebarSec.css';

function SidebarSec({active, text, Icon}) {
  return (
    <div className={`sidebarSec ${active && 'sidebarSec--active'}`}>
      <Icon className ="sidebarIcon" />
      <h2>{text}</h2>
      
    </div>
  )
}

export default SidebarSec; 