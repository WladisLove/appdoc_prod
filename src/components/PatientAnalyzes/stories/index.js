import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PatientAnalyzes from '../';

import {analyzesArr} from './mock-data'

storiesOf('PatientAnalyzes', module)
    .add('PatientAnalyzes', () => (
        <div>
            <PatientAnalyzes data={analyzesArr}/>
        </div>
    ))