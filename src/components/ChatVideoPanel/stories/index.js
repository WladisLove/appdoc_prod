import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ChatVideoPanel from '../';

storiesOf('ChatVideoPanel', module)
    .add('default', () => (
        <div>
            not Calling
            <ChatVideoPanel   onStop={()=>console.log('eeeee')} isCalling={false}/>

            is Calling
            <ChatVideoPanel hour={2} onStop={()=>console.log('eeeee')} isCalling={true}/>
        </div>
    ))