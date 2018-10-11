import React, { Component } from 'react';
import Markdown from 'react-remarkable'
import saveAs from 'file-saver';

import Sidebar from './Sidebar';

import '../../styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentlyActive: 0,
      notes: [
        {
          title: 'Untitled',
          content: 'Write something here...',
        },
      ],
    };
    this.addNewNote = this.addNewNote.bind(this);
    this.changeNote = this.changeNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.handleTitleRename = this.handleTitleRename.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.downloadNote = this.downloadNote.bind(this);
  }

  componentWillMount() {
    localStorage.getItem('notes') && this.setState({
      currentlyActive: 0,
      notes: JSON.parse(localStorage.getItem('notes')),
    });
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('notes', JSON.stringify(nextState.notes));
  }

  addNewNote() {
    this.setState({
      notes: [...this.state.notes, {title: 'Untitled', content: 'Write something here...'}]
    });
  }

  changeNote(e) {
    this.setState({currentlyActive: e.target.id});
  }

  deleteNote(e) {
    e.stopPropagation();

    const deleteID = e.target.getAttribute('data-key');
    const newStateNotes = [...this.state.notes];
    newStateNotes.splice(deleteID, 1);

    this.setState({
      currentlyActive: 0,
      notes: newStateNotes
    });
  }

  handleTitleRename(e){
    const newStateNotes = [...this.state.notes];
    newStateNotes[this.state.currentlyActive].title = e.target.value;

    this.setState({notes: newStateNotes });
  }

  handleTextareaChange(e){
    const newStateNotes = [...this.state.notes];
    newStateNotes[this.state.currentlyActive].content = e.target.value;

    this.setState({notes: newStateNotes });

    e.target.style.height = "5px";
    e.target.style.height = (e.target.scrollHeight)+"px";
  }

  downloadNote(e) {
    const targetNote = this.state.notes[e.target.getAttribute('data-key')];
    const data = new Blob([targetNote.content], {type: 'text/markdown'});
    saveAs(data, `${targetNote.title}.md`);
  }

  render() {

    const {currentlyActive, notes} = this.state;

    return (
      <div>

        <Sidebar
          addNewNote={this.addNewNote}
          changeNote={this.changeNote}
          deleteNote={this.deleteNote}
          notes={notes}/>

        <div className="container">
          <div className="row">

            <div className="col-12">
              <h2><input
                className='title-input'
                value={notes[currentlyActive].title}
                onChange={this.handleTitleRename}></input></h2>
              <button
                onClick={this.downloadNote}
                data-key={currentlyActive}>download 2</button>
            </div>

            <div className="col-5 editor-view">
              <textarea
                className="markdown-editor"
                value={notes[currentlyActive].content}
                onChange={this.handleTextareaChange}>
              </textarea>
            </div>

            <div className="col-5 presentation-view">
              <Markdown source={notes[currentlyActive].content} />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
