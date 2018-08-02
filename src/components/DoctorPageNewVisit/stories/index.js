import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DoctorPageNewVisit from '../';

// import {historyArr} from './mock-data'

storiesOf('DoctorPageNewVisit', module)
    .add('DoctorPageNewVisit', () => (
        <div>
            <DoctorPageNewVisit/>
        </div>
    ))