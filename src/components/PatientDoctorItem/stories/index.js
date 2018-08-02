import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PatientDoctorItem from '../';

storiesOf('PatientDoctorItem', module)
    .add('PatientDoctorItem', () => (
        <div>
            <PatientDoctorItem 
                doctorAvatar="https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/fc/3036143-poster-p-1-5-strategies-for-big-picture-thinking.png"
                doctorName="Тимошенко А.И."
                doctorSpecialty="Терапевт"
                doctorRate={3}
                doctorRank="Доктор медицинских наук"
                doctorCategory= "Первая категория"
                doctorExp= "8 лет"
            />
        </div>
    ))