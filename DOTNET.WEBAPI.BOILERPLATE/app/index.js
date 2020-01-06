// let message = 'HI ako to yung mandirigma ng bizboxsssss';

// console.log(message);

// React 
import React from 'react';
import ReactDom from 'react-dom';

//Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

//Helmet
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';

//App
import store from './store';
import getRoutes from './routes';
import NotificationsContainer from './shared-components/notifications';


console.log('[APP START]');

//http://www.material-ui.com/#/get-started/installation
injectTapEventPlugin();

ReactDom.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <div>
                <Helmet titleTemplate="AllowIt" />
                {getRoutes()}
                <NotificationsContainer/>
            </div>
        </MuiThemeProvider>        
    </Provider>,
    document.getElementById('root')
);
