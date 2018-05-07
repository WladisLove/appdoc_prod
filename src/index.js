import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'

import './index.css';

import { store, history } from './store'

import Root from './containers/Root'
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <CookiesProvider>
        {/* ??? HOW does it act*/}

        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Root />
            </ConnectedRouter>
        </Provider>


    </CookiesProvider>,
    rootElement);
registerServiceWorker();
