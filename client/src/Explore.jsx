import React, { useState, useEffect } from 'react';
import './Explore.css';

function Explore({ searchQuery, members }) {

  //extract roles
  const getMemberRoles = (member) => {
    const roles = [];
    if (member.dev) roles.push('dev');
    if (member.des) roles.push('des');
    if (member.pm) roles.push('pm');
    if (member.core) roles.push('core');
    if (member.mentor) roles.push('mentor');
    return roles;
  };

  //filter based on query from rightsidebar
  const filteredMembers = members.filter(member => {
    if (!searchQuery) return true;
    return member.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  //render
  return (
    <div className="explore">
      {/*sticky header */}
      <div className="explore-header">
        <h1 className="explore-title">Explore DALI Members</h1>
        <p className="explore-subtitle">{members.length} Members</p>
      </div>

      {/*member List */}
      <div className="members-list">
        {members.map((member, index) => {
          const roles = getMemberRoles(member);
          const handle = `@${member.name.toLowerCase().replace(' ', '')}`;

          return (
            <div key={member.id || index} className="member-row">

              <div className="member-placeholder"> {/*overlap images*/}

                {member.picture && (
                  <img 
                    src={member.picture} 
                    alt={member.name} 
                    className="member-avatar"
                    onError={(e) => { e.target.style.display = 'none'; }} 
                  />
                )}
              </div>
              <div className="member-info">
                <div className="member-header-text">
                  <span className="member-name">{member.name}</span>
                  <span className="member-handle">{handle}</span>
                </div>

                {roles.length > 0 && (
                  <div className="member-roles">
                    {roles.map((role) => (
                      <span key={role} className={`role-badge role-${role}`}>
                        {role}
                        </span>
                    ))}
                  </div>
                )}
            </div>
        </div>
      );
    })} 
    </div>
  </div>
  );
}

export default Explore;