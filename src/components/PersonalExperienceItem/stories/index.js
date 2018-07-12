import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PersonalExperienceItem from '../';

storiesOf('PersonalExperienceItem', module)
    .add('PersonalExperienceItem', () => (
        <div>
            <PersonalExperienceItem 
                post="Стоматолог"
                placeOfWord="Мед центр «Lorem ipsum dolor sit amet»"
                dateStart="2011"
                expWork="10"
            />
        </div>
    ))