import React, { Component } from 'react';
import Markdown from 'react-remarkable'

// import EditorView from './EditorView';
// import PresentationView from './PresentationView';

import '../../styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
  }

  handleTextareaChange(e){
    this.setState({content: e.target.value});

    e.target.style.height = "5px";
    e.target.style.height = (e.target.scrollHeight)+"px";
  }

  render() {
    return (
      <div>

        <div className="side-bar">
          <h2>Notes</h2>
          <div className="saved-notes">
            <div className="note">asdasd</div>
            <div className="note">24234</div>
            <div className="note">sdgdsfgdsfg</div>
            <div className="note">t234bts gdfsg</div>
          </div>
        </div>

        <div className="container">
          <div className="row">

            <div className="col-12"><header><h2>Markdown Editor</h2></header></div>

            <div className="col-5 editor-view">
              <textarea
                className="markdown-editor"
                value={this.state.content}
                onChange={this.handleTextareaChange}>
              </textarea>
            </div>

            <div className="col-5 presentation-view">
              <Markdown source={this.state.content} />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
