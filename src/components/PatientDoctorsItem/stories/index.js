import React from 'react';
import { storiesOf } from '@storybook/react';
import PatientDoctorsItem from '../';

storiesOf('PatientDoctorsItem', module)
    .add('PatientDoctorsItem', () => (
        <div>
            <PatientDoctorsItem
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
                carouselDays={[
                    {day: 'Пн'},
                    {day: 'Вт'},
                    {day: 'Ср'},
                    {day: 'Чт'},
                    {day: 'Пят'},
                    {day: 'Суб'},
                    {day: 'Вск'},
                ]}
                carouselTimes={[
                    {time: '10:30'},
                    {time: '10:50'},
                    {time: '11:10'},
                    {time: '11:30'},
                    {time: '11:50'},
                    {time: '12:10'},
                    {time: '12:30'},
                    {time: '12:50'},
                    {time: '13:10'},
                    {time: '13:30'},
                    {time: '13:50'},
                    {time: '14:10'},
                    {time: '14:30'},
                    {time: '14:50'},
                    {time: '15:10'},
                    {time: '15:30'},
                    {time: '15:50'},
                ]}
            />
        </div>
    ));