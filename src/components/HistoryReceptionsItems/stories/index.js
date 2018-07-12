import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import HistoryReceptionsItems from '../';

storiesOf('HistoryReceptionsItems', module)
    .add('HistoryReceptionsItems', () => (
        <div>
            <HistoryReceptionsItems 
                date="15.09.2017"
                time="15:00-16:00"
                type='chat1'
                diagnostic='Сахарный диабет'
                comments='Lorem ipsum dolor sit amet, consectetuer adipiscing elit.'
                price='112 руб.'
                conclusion='Lorem ipsum dolor sit amet, consectetuer adipiscing elit'
                conclusionDownload='Заключение 252525.pdf'
                review='Lorem ipsum dolor sit amet, consectetuer...'
                onGotoChat={(id)=>console.log('gotoChat',id)}
            />
        </div>
    ))