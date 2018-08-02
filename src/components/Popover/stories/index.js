import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PopoverApp from '../';

import {dataArr} from './mock-data'

storiesOf('PopoverApp', module)
    .add('Popover', () => (
        <div style={{ padding: '30px' }}>
            <PopoverApp  data={dataArr} onClose={() => console.log('onClose')}>
                <div style={{width:100, height: 100, backgroundColor: 'yellow'}}
                     onClick={() => dataArr}>
                    smth
                </div>
            </PopoverApp>
        </div>
    ))