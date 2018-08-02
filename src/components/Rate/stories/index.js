import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Rate from '../';

storiesOf('Rate', module)
    .add('Rate', () => (
        <div>
            <Rate defaultValue={2}/>
            <br/>
            <Rate defaultValue={2} disabled/>
        </div>
    ))