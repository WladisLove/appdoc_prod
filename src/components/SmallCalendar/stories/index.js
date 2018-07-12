import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SmallCalendar from '../'

storiesOf('SmallCalendar', module)
    .add('default', () => (
        <div>
            <SmallCalendar onChange={action('Date')} date={new Date(2018,1,5)}/>
        </div>
    ))