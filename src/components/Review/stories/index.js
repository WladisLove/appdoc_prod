import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Review from '../';

import {data1, data2, data3} from './mock-data'

storiesOf('Review', module)
    .add('with comment', () => (
        <div>
            <Review {...data2} 
                    onTreatmentClick={(id)=> console.log(id)}
                    onSend = {(obj) => console.log(obj)}/>
            <Review {...data2} 
                    isSecondAllowed={false}
                    onTreatmentClick={(id)=> console.log(id)}
                    onSend = {(obj) => console.log(obj)}/>
        </div>
    ))
    .add('without comment', () => (
        <div>
            <Review {...data1} 
            onSend = {(obj) => console.log('obj: ',obj)}/>
        </div>
    ))
    /*.add('together', () => (
        <div>
            <Review {...data3}/>
        </div>
    ))*/;