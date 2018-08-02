import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ChatDialogs from '../';

import {dialogArr} from './mock-data'

storiesOf('ChatDialogs', module)
    .add('ChatDialogs', () => (
        <div>
            <ChatDialogs data={dialogArr} 
                onGoto = {id => console.log(id)}
                onGotoChat={id => console.log(id)}/>
        </div>
    ))