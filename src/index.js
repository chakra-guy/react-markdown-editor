import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/components/App.js';

import 'normalize.css';
import './styles/grid.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
