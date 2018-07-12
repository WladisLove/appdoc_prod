import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PatientDoctor from '../';

import {doctorArr} from './mock-data'

storiesOf('PatientDoctor', module)
    .add('PatientDoctor', () => (
        <div>
            <PatientDoctor 
            	data={doctorArr}
            	onGoto={()=>console.log('click')}
            />
        </div>
    ))