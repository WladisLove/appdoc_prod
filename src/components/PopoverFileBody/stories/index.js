import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PopoverFileBody from '../';

import {filesArr} from './mock-data'

storiesOf('PopoverFileBody', module)
    .add('PopoverFileBody', () => (
        <div style={{ padding: '30px' }}>
            <PopoverFileBody data={filesArr}
            />
        </div>
    ))