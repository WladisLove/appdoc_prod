import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PersonalEducation from '../';

storiesOf('PersonalEducation', module)
    .add('PersonalEducation', () => (
        <div>
            <PersonalEducation 
                mainInstitution="Белорусский государственный медицинский университет" 
                mainSpecialty="Факультет стоматологии. Стоматолог" 
                secondInstitution="Медицинский университет Lorem ipsum dolor sit amet" 
                secondSpecialty="Курс стоматологии. Стоматолог"
                mainDateStart="30.07.2012"
                mainDateEnd="30.07.2018"
                dateStart="30.07.2012"
                dateEnd="30.07.2018"
                degree="Кандидат медицинских наук"
            />
        </div>
    ))