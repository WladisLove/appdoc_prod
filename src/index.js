import React from 'react';
import ReactDOM from 'react-dom';
import {CookiesProvider} from 'react-cookie'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'
import {LocaleProvider} from 'antd'
import {LocalizeProvider, Translate} from 'react-localize-redux'
import enUS from 'antd/lib/locale-provider/en_US';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import 'moment/locale/ru';
import "./styles/fonts.css"
import "./styles/variables.css"
import "./icon/style.css"
import './index.css';
import '../node_modules/antd/dist/antd.css'
import '../node_modules/react-scrollbar/dist/css/scrollArea.css'


import {store, history} from './store'

import Root from './containers/Root'
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');
const activeLanguage = window.localStorage.getItem('lang')
ReactDOM.render(
    <LocalizeProvider>
        <CookiesProvider>
            <LocaleProvider locale={(activeLanguage && activeLanguage == 'en') ? enUS : ruRU}>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <Root/>
                    </ConnectedRouter>
                </Provider>
            </LocaleProvider>
        </CookiesProvider>
    </LocalizeProvider>,
    rootElement);
registerServiceWorker();
