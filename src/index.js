import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './index.css'
import {SnackbarProvider} from 'notistack'
import {Button} from '@material-ui/core'


ReactDOM.render(
    <SnackbarProvider >
        <App />
    </SnackbarProvider>
    ,document.getElementById('root')
);