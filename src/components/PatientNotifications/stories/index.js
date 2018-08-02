import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PatientNotifications from '../';

storiesOf('PatientNotifications', module)
    .add('PatientNotifications', () => (
        <div>
            <PatientNotifications  
                title='Присылать на почту'
                contact='Почта'
            />
        </div>
    ))