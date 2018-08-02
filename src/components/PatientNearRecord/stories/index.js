import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PatientNearRecord from '../';

import {nearArr} from './mock-data'

storiesOf('PatientNearRecord', module)
    .add('PatientNearRecord', () => (
        <div>
            <PatientNearRecord 
            	data={nearArr}
            	onGoto={()=>console.log('click')}
            />
        </div>
    ))