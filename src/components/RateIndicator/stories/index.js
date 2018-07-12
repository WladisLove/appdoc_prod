import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RateIndicator from '../';

storiesOf('RateIndicator', module)
    .add('RateIndicator', () => (
        <RateIndicator rateValue={4} reviewsNum={36}/>
    ));