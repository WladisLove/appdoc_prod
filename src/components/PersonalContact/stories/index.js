import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PersonalContact from '../';

storiesOf('PersonalContact', module)
    .add('PersonalContact', () => (
        <div>
            <PersonalContact 
                secondname="Иванова" 
                firstname="Иван" 
                patronymic="Иванович" 
                phone="+375 29 111 11 11" 
                email="test@test.com" 
                oldPassword="1111" 
                newPassword="" 
            />
        </div>
    ))