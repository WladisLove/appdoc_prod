import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ChatCard from '../';

import {filesArr} from './mock-data.js'

const Class = (props) =>{

    return (<div>lool {props.lol}</div>)
}

storiesOf('ChatCard', module)
    .add('ChatCard', () => (
        <div>
            <ChatCard
                data={filesArr}
            	patientName='Иванова Александра Константиновна'
                online='online'
                isActive={false}

                videoContent = {<Class lol={3}/>}

                videoCalling={false}

                onVideoCallBegin={()=> console.log('Begin video calling')}
                onVideoCallStop={action('Close video calling')}
            />
        </div>
    ))