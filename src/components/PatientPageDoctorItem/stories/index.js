import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PatientPageDoctorItem from '../';

storiesOf('PatientPageDoctorItem', module)
    .add('PatientPageDoctorItem', () => (
        <div>
            <PatientPageDoctorItem 
                doctorRate={4}
                doctorReviews={15}
                doctorFavorite={true}
                doctorName='Петрова Александра Константиновна'
                doctorSpeciality='терапевт'
                doctorCategory='Высшая категория, кандидат медицинских наук'
                doctorExp='Стаж работы 17 лет '
                doctorPrice='35'
                doctorLanguages={[
                    {language: 'Английский'},
                    {language: 'Русский'},
                ]}
                doctorChild={true}
            />
        </div>
    ))