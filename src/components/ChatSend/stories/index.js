import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ChatSend from '../';

storiesOf('ChatSend', module)
    .add('default', () => (
        <div>
            <ChatSend send={message => console.log(message)}
                        disable={false}
                        closeVisit = {() => console.log('close visit')}
                        uploadFiles = {(arr) => console.log('files:',arr.thumbUrl.substr(0,50))}
                        uploadConclusion = {(arr) => console.log('conclusions:',arr.thumbUrl.substr(0,50))}
            />
            <ChatSend send={message => console.log(message)}
                        disable={false}
                        isUser={true}
                        makeReview = {() => console.log('make review')}
                        uploadFiles = {(arr) => console.log('files:',arr.thumbUrl.substr(0,50))}
                        uploadConclusion = {(arr) => console.log('conclusions:',arr.thumbUrl.substr(0,50))}
            />
        </div>
    ))