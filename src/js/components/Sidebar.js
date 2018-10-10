import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    return (
      <div className="side-bar">
        <h2>Notes</h2>
        <div className="saved-notes">
          { this.props.notes.map((e, i) =>
            <div id={i} className='note' onClick={this.props.changeNote}>
              {e.title}
              <span className='delete-note' onClick={this.props.deleteNote}>x</span>
            </div>
          ) }
          <button className="add-note" onClick={this.props.addNewNote}>+Add new</button>
        </div>
      </div>
    );
  }
}

export default Sidebar;
