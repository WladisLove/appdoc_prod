import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Reviews from '../';

import {dataArr} from './mock-data'

storiesOf('Reviews', module)
    .add('Reviews', () => (
        <div>
            <Reviews data={dataArr} 
                    numToDisplay={5} 
                    onGotoChat={(id) => console.log('gotochat', id)}
                    onGoto={(id) => console.log('goto', id)}/>
        </div>
    ));