import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import HistoryReceptions from '../';

import {historyArr} from './mock-data'

storiesOf('HistoryReceptions', module)
    .add('HistoryReceptions', () => (
        <div>
            <HistoryReceptions data={historyArr} 
                        onGotoChat = {(id) => console.log(id)}/>
        </div>
    ))