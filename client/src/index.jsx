///////////////// Client-Side Code //////////////////

// Requiring third party packages
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Requiring inbuilt packages
import App from './App';

// Rendering to the DOM
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
)