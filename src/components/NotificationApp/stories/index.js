import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import NotificationApp from '../';

import {notificationArr} from './mock-data'
// left и top - обязательны, чтобы не пропадала
// position:'fixed' - обязательно
// marginLeft and marginTop - коордация для только! колокольчика
// props top - для координации всплывающее окна относительно экрана


storiesOf('NotificationApp', module)
    .add('NotificationApp', () => (
        <div>
            <div style={{ width: '300px', height: '1000px'}}> dsd</div>
            <div style={{ padding: '30px', marginLeft:'900px',marginTop:'100px', position:'fixed' , left:'0', top:'0' }}>
                <NotificationApp  data={notificationArr} top="29%" getId={id => console.log(id)}/>
            </div>
            <div style={{ width: '300px', height: '1000px'}}> dsd</div>
        </div>

    ))