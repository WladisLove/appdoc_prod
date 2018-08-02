import React from 'react';
import { storiesOf } from '@storybook/react';
import moment from 'moment';
import { action } from '@storybook/addon-actions';

import DatePicker from '../';

const dateFormat = 'DD.MM.YYYY';
const rangeSet = {
    placeholderStart: 'Начало',
    defaultEndValue: moment('12.12.2017', dateFormat),
};

storiesOf('DatePicker', module)
    .add('default', () => (
        <DatePicker onChange={action('Time picked')}/>
    ))
    .add('range', () => (
        <DatePicker range rangeSet={rangeSet} onChange={action('Range picked')}/>
    ))
    .add('small', () => (
        <DatePicker small rangeSet={rangeSet} onChange={action('Range picked')}/>
    ))
;