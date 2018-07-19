import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PatientCalendarCarousel from '../';
import {timeIntervals} from './mock-data'

storiesOf('PatientCalendarCarousel', module)
    .add('PatientCalendarCarousel', () => (
        <div>
            <PatientCalendarCarousel
            	intervals={timeIntervals}
                newVisitVisible = {(a)=>console.log("addNewDoctorVisible", a)}
             />
        </div>
    ))