import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PatientAccardionDiseaseItem from '../';

storiesOf('PatientAccardionDiseaseItem', module)
    .add('PatientAccardionDiseaseItem', () => (
        <div>
            <PatientAccardionDiseaseItem 
                title="Хронические болезни"
                diseases={[
		            {disease: 'Хронический миокардит', diseaseDate: '01.01.1999'},
		            {disease: 'Кардиомиопатия', diseaseDate: '01.01.1999'},
		        ]}
            />
        </div>
    ))