import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Checkbox from '../';

storiesOf('Checkbox', module)
    .add('Checkbox', () => (
        <div>
            <Checkbox>Checkbox</Checkbox>
        </div>
    ))