import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RatePanel from '../';

storiesOf('RatePanel', module)
    .add('RatePanel', () => (
        <div>
            <RatePanel rateValue={4}
                       timesRated={15}/>
        </div>
    ))