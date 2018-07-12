import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PopoverBody from '../';

import {dataArr} from './mock-data'

storiesOf('PopoverBody', module)
    .add('PopoverBody', () => (
        <div style={{ padding: '30px' }}>
            <PopoverBody
                fio='Андреев Владислав'
                id_user="2749"
                type="voice"
            	date={dataArr.date}
            	time={dataArr.time} 
            	text={dataArr.text}
                onPhone = {action('onPhone')}
                onEmail = {action('onPhone')}
                onGoto={(id)=>console.log('click', id)}
            />
        </div>
    ))