import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PatientNotificationsItem from '../';

storiesOf('PatientNotificationsItem', module)
    .add('PatientNotificationsItem', () => (
        <div>
            <PatientNotificationsItem  
                title='Присылать на почту'
                contact='Почта'
            />
        </div>
    ))