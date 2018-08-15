import React from 'react';
import { storiesOf } from '@storybook/react';

import PopoverRemedy from '../';

import {remedyArr} from './mock-data'

storiesOf('PopoverRemedy', module)
    .add('PopoverRemedy', () => (
        <div style={{ padding: '30px' }}>
            <PopoverRemedy 
                data={remedyArr} 
                postTitle='Список препаратов, назначенных врачом:' />
        </div>
    ))