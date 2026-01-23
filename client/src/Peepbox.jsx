import React, {useState} from 'react'; //import to track what user types
import './Peepbox.css';

function Peepbox({ onCreatePost }) {
  const [peepText, setPeepText] = useState('');

  //so page doesn't refresh
  const handleSubmit = (e) => {
    e.preventDefault();

  if (peepText.trim()) {
      onCreatePost(peepText); //sends to backend
      setPeepText('');  //clears input after posting
    }
  };

  return (
    <div className="peepBox">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="peepBoxInput"
          placeholder="What's on your mind?"
          value={peepText}
          onChange={(e) => setPeepText(e.target.value)}/>

        <button className="peepBox__peepButton"><span>Peep</span></button>
      </form>
    </div>
  );
}

export default Peepbox;