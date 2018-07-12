import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PersonalExperience from '../';

storiesOf('PersonalExperience', module)
    .add('PersonalExperience', () => (
        <div>
            <PersonalExperience 
                post="Стоматолог"
                placeOfWord="Мед центр «Lorem ipsum dolor sit amet»"
                dateStart="2011"
                expWork="10"
            />
        </div>
    ))