import React from 'react';
import { storiesOf } from '@storybook/react';

import PopoverRemedyAccardion from '../';

import {filesArr} from './mock-data'

storiesOf('PopoverRemedyAccardion', module)
    .add('PopoverRemedyAccardion', () => (
        <div style={{ padding: '30px' }}>
            <PopoverRemedyAccardion 
                nameRemedy='Аспирин'
                data={filesArr}
            />
        </div>
    ))