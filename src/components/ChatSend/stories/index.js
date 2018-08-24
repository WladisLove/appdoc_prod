import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ChatSend from '../';
import axios from "axios"

const sendHandler = (file) => {
    console.log('file:',file.thumbUrl.substr(0,50))
    console.log(12345, 54321)
    const obj = {
        id_zap: 12345,
        id_user: 54321,
        file: [file],
    }
    axios.post('https://appdoc.by/~api/json/catalog.doc2/saveFilesChat',
            JSON.stringify(obj))
            .then(res => {
                console.log(JSON.stringify(obj))
                console.log(res)
            })
            .catch(err => {
                console.log(err);
        })
}

storiesOf('ChatSend', module)
    .add('default', () => (
        <div>
            <ChatSend send={message => console.log(message)}
                        disable={false}
                        closeVisit = {() => console.log('close visit')}
                        uploadFiles = {sendHandler}
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