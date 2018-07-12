import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PersonalInformation from '../';

const langData = ['Английский', 'Русский', 'Немецкий', 'Японский'];
const priceData = ['50 - 100 руб', '100 - 200 руб', '200 - 500 руб', '500 - 1000 руб'];

storiesOf('PersonalInformation', module)
    .add('PersonalInformation', () => (
        <div>
            <PersonalInformation 
                langData={langData}
                priceData={priceData}
            />
        </div>
    ))