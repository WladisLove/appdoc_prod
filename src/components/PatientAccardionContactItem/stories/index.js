import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PatientAccardionContactItem from '../';

storiesOf('PatientAccardionContactItem', module)
    .add('PatientAccardionContactItem', () => (
        <div>
            <PatientAccardionContactItem 
                contactFio='Иванова Александра Константиновна'
                contactPhone='+ 375 29 234 74 55'
                contactEmail='ivanova234@mail.ru'
                contactAdress='г. Минск, ул. Строителей, д. 34, кв. 18'
                contactPas='test'
                contactNewPas=''
            />
        </div>
    ))