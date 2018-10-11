import React from 'react';

const Sidebar = (props) => {
  return (
    <div className="side-bar">
      <h2>Notes</h2>
      <div className="saved-notes">

        { props.notes.map((e, i) =>
          <div id={i} key={i} className='note' onClick={props.changeNote}>
            {e.title}
            <span className='delete-note' data-key={i} onClick={props.deleteNote}>x</span>
          </div>
        ) }

        <button className="add-note" onClick={props.addNewNote}>+Add new</button>
      </div>
    </div>
  );
}

export default Sidebar;
