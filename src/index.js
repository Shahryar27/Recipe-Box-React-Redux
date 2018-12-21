import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {App} from './components';
import store from './store';
import themeDefault from './theme-default';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={themeDefault}>
            <App />
        </MuiThemeProvider>
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
