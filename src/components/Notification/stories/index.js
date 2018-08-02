import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NotificationItem from '../';

import {notificationArr} from './mock-data'

storiesOf('Notification', module)
    .add('default', () => (
        <div>
            <NotificationItem
            	title="добавлена Новая запись"
            	date='26.11.2018'
            	time="15:50"
            	thisTime="10:50"
            	desc="Иванов Александр"
                watch= {true}

                getId = {(id) => console.log(id)}
            />
        </div>
    ))
    .add('cancel', () => (
        <div>
            <NotificationItem
                status='cancel'
                title="Запись удалена"
                date='26.11.2018'
                time="15:50"
                thisTime="10:50"
                desc="Иванов Александр"
                watch= {false}
            />
        </div>
    ))
    .add('new', () => (
        <div>
            <NotificationItem 
            	status='new'
            	title="добавлена Новая запись"
            	date='26.11.2018'
            	time="15:50"
            	thisTime="10:50"
            	desc="Иванов Александр"
                watch= {false}
            />
        </div>
    ))
    .add('research', () => (
        <div>
            <NotificationItem
                status='research'
                title="Добавлены результаты исследований "
                date='26.11.2018'
                time="15:50"
                thisTime="10:50"
                desc="Иванов Александр"
                file={[{},{}]}
                watch= {false}
            />
        </div>
    ))

    .add('five', () => (
        <div>
            <NotificationItem
                status='five'
                title="Прием начинается через 5 минут"
                date='26.11.2018'
                time="15:50"
                thisTime="10:50"
                desc="Иванов Александр"
                watch= {false}
            />
        </div>
    ))
    .add('tomorrow', () => (
        <div>
            <NotificationItem
                status='tomorrow'
                title="Завтра начало приема - "
                date='26.11.2018'
                time="15:50"
                thisTime="10:50"
                desc="Иванов Александр"
                watch= {false}
            />
        </div>
    ))
    .add('negative', () => (
        <div>
            <NotificationItem
                status='negative'
                title="Оставлен негативный отзыв"
                date='26.11.2018'
                time="15:50"
                thisTime="10:50"
                desc="Иванов Александр"
                watch= {false}
            />
        </div>
    ))
    .add('call', () => (
        <div>
            <NotificationItem
                status='call'
                title="Экстренный вызов"
                time={1528189810}
                thisTime={1528189810}
                desc="Иванов Александр"
                watch= {false}
                id={222}

                getId = {(id) => console.log(id)}
            />
        </div>
    ))
