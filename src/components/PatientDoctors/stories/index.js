import React from 'react';
import { storiesOf } from '@storybook/react';
import PatientDoctors from '../';
import {doctors} from './mock-data'


storiesOf('PatientDoctors', module)
    .add('PatientDoctors', () => (
        <div>
                <PatientDoctors  doctors={doctors}/>

        </div>
    ));