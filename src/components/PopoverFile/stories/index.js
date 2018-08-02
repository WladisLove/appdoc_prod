import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PopoverFile from '../';

import {filesArr} from './mock-data'

storiesOf('PopoverFile', module)
    .add('Popover', () => (
        <div style={{ padding: '30px' }}>
            <PopoverFile data={filesArr}/>
        </div>
    ))