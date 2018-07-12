import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ChatFiles from '../';

storiesOf('ChatFiles', module)
    .add('default', () => (
        <div>
            <ChatFiles
            	status='new'
            	date='20.11.2017' 
            />
            <ChatFiles
            	status='new'
            	date='20.11.2017' 
            />
            <ChatFiles
            	date='20.11.2017' 
            />
            <ChatFiles 
            	date='20.11.2017' 
            />
        </div>
    ))