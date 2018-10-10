import React, { Component } from 'react';
import Markdown from 'react-remarkable'

import Sidebar from './Sidebar';
// import EditorView from './EditorView';
// import PresentationView from './PresentationView';

import '../../styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentlyActive: 0,
      notes: [
        {
          title: 'Untitled',
          content: 'Write something here...'
        },
      ]
    };
    this.addNewNote = this.addNewNote.bind(this);
    this.changeNote = this.changeNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.handleTitleRename = this.handleTitleRename.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
  }

  addNewNote() {
    this.setState({
      ...this.state,
      notes: [...this.state.notes, {title: 'Untitled', content: 'Write something here...'}]
    });
  }

  changeNote(e) {
    this.setState({...this.state, currentlyActive: e.target.id});
  }

  deleteNote(e) {
    e.stopPropagation();

    const deleteID = e.target.parentNode.id;
    const newStateNotes = [...this.state.notes];
    newStateNotes.splice(deleteID, 1);

    this.setState({
      ...this.state,
      currentlyActive: deleteID - 1,
      notes: newStateNotes
    });
  }

  handleTitleRename(e){
    const newStateNotes = [...this.state.notes];
    newStateNotes[this.state.currentlyActive].title = e.target.value;

    this.setState({...this.state, notes: newStateNotes });
  }

  handleTextareaChange(e){
    const newStateNotes = [...this.state.notes];
    newStateNotes[this.state.currentlyActive].content = e.target.value;

    this.setState({...this.state, notes: newStateNotes });

    e.target.style.height = "5px";
    e.target.style.height = (e.target.scrollHeight)+"px";
  }

  render() {
    return (
      <div>

        <Sidebar
          addNewNote={this.addNewNote}
          changeNote={this.changeNote}
          deleteNote={this.deleteNote}
          notes={this.state.notes}/>

        <div className="container">
          <div className="row">

            <div className="col-12">
              <h2><input
                className='title-input'
                value={this.state.notes[this.state.currentlyActive].title}
                onChange={this.handleTitleRename}
                ></input></h2>
            </div>

            <div className="col-5 editor-view">
              <textarea
                className="markdown-editor"
                value={this.state.notes[this.state.currentlyActive].content}
                onChange={this.handleTextareaChange}>
              </textarea>
            </div>

            <div className="col-5 presentation-view">
              <Markdown source={this.state.notes[this.state.currentlyActive].content} />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
