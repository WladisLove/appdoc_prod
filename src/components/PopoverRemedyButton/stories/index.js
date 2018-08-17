import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PopoverRemedyButton from '../';

import {btnRemedy} from './mock-data'

storiesOf('PopoverRemedyButton', module)
    .add('Popover', () => (
        <div style={{ padding: '30px' }}>
            <PopoverRemedyButton  data={btnRemedy}>
                <div style={{width:100, height: 100, backgroundColor: 'yellow'}}
                     onClick={() => btnRemedy}>
                    smth
                </div>
            </PopoverRemedyButton>
        </div>
    ))