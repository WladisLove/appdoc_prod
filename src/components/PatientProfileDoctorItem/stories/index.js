import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PatientProfileDoctorItem from '../';

storiesOf('PatientProfileDoctorItem', module)
    .add('PatientProfileDoctorItem', () => (
        <div>
            <PatientProfileDoctorItem 
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

                doctorMaps={[
                    {map: '«Доктор рядом» в Ховрино ул.Фестивальная, д.32'},
                    {map: '«Доктор рядом» в Лосиноостровском ул. летчика Бабушкина, д.42'},
                ]}
                doctorExperience={[
                    {experience: 'Рязанский медицинский институт имени академика И.П. Павлова, специальность - Лечебное дело, в 1993 году.'},
                    {experience: 'Рязанский медицинский институт имени академика И.П. Павлова, Интернатура, Психиатрия и психотерапия ФУВ, 1994 г.'},
                    {experience: 'Государственный научный центр социальной и судебной психиатрии им. В.П.Сербского, Москва, Социальная, судебная и общая психиатрия, 2003г.'},
                    {experience: 'Первый Московский государственный медицинский университет имени И.М.Сеченова, Психиатрия, 2008г. '},
                ]}
            />
        </div>
    ))