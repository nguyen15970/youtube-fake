import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./base.scss"
import { Provider } from 'react-redux';
import store from './redux/store';

import "bootstrap/dist/css/bootstrap.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);


