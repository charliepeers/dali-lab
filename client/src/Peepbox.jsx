import React from 'react';
import './Peepbox.css';

function Peepbox() {
  return (
    <div className="peepBox">
      <form className="form">
        <input className="peepBoxInput" placeholder="What's on your mind?" />
        <button className="peepBox__peepButton"><span>Peep</span></button>
      </form>
    </div>
  );
}

export default Peepbox;