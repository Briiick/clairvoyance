import React from 'react';
import ReactDOM from 'react-dom';
import "./assets/sass/bootstrap.scss"
import AppState from './views/AppState';

import { Provider } from 'react-redux';
import store from './store';

const root = document.getElementById('root');

// render app state
ReactDOM.render(<Provider store={store}><AppState /></Provider>, root);
