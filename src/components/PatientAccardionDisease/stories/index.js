import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PatientAccardionDisease from '../';

storiesOf('PatientAccardionDisease', module)
    .add('PatientAccardionDisease', () => (
        <div>
            <PatientAccardionDisease 
                title="Хронические болезни"
                disease="Хронический миокардит"
                diseaseDate="21.06.1999"
            />
        </div>
    ))