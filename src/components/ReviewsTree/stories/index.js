import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ReviewsTree from '../';

import {dataArr} from './mock-data'

storiesOf('ReviewsTree', module)
    .add('ReviewsTree', () => (
        <div>
            <ReviewsTree data={dataArr} 
                        limit={2} 
                        onSend={(obj) => console.log('onSend:', obj)}
                        onGoto = {id => console.log('onGoto', id)}
                        onGotoChat = {id => console.log('onGotoChat', id)}
            />
        </div>
    ))