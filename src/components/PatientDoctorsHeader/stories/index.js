import React from 'react';
import { storiesOf } from '@storybook/react';
import PatientTable from '../';
import PatientDoctorsHeader from "../index";

storiesOf('PatientDoctorsHeader', module)
    .add('PatientTable', () => (
        <div>
            <PatientDoctorsHeader
                        onAdd={() => console.log('ererre')}
                        onSearch={(a) => console.log(a)}
                        />
        </div>
    ));