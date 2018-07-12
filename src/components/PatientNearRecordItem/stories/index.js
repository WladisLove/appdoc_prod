import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PatientNearRecordItem from '../';

storiesOf('PatientNearRecordItem', module)
    .add('PatientNearRecordItem', () => (
        <div>
            <PatientNearRecordItem 
                doctorName="Тимошенко А.И."
                doctorSpecialty="Терапевт"
                dateDay="12"
                dateMonth="января"
                time= "16:00 - 16:20"
            />
        </div>
    ))