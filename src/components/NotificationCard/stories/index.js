import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NotificationCard from '../';

import {notificationArr} from './mock-data'

storiesOf('NotificationCard', module)
    .add('default', () => (
        <div>
            <NotificationCard data={notificationArr} getId={(id) => console.log(id)}/>
        </div>
    ))