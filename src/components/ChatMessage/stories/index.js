import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ChatMessage from '../';

storiesOf('ChatMessage', module)
    .add('default', () => (
        <div>
            <ChatMessage 
                img="https://www.proza.ru/pics/2017/06/03/1990.jpg" 
                text="Консультация по результатам анализа..." 
                date={Date.now()}
                isMy
            />

            <ChatMessage 
                img="https://www.proza.ru/pics/2017/06/03/1990.jpg" 
                text="Да"
                date={Date.now()}
            />

            <ChatMessage 
                img="https://www.proza.ru/pics/2017/06/03/1990.jpg" 
                text="Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах."
                date={Date.now()}
            />
            <ChatMessage 
                isDate = {true}
                date={1517432400}
            />
            <ChatMessage 
                isVisEnd = {true}
                isDate = {false}
                date={1517432400}
            />
            <ChatMessage 
                img="https://www.proza.ru/pics/2017/06/03/1990.jpg" 
                type="notBegin"
                name="иванова татьяна ивановна"
                date={Date.now()}
                isMy
            />
            <ChatMessage 
                img="https://www.proza.ru/pics/2017/06/03/1990.jpg" 
                type="notBegin"
                name="иванова татьяна ивановна"
                date={Date.now()}
            />
            <ChatMessage 
                img="https://www.proza.ru/pics/2017/06/03/1990.jpg" 
                type="begin"
                name="иванова татьяна ивановна"
                date={Date.now()}
                isMy
            />
            <ChatMessage 
                img="https://www.proza.ru/pics/2017/06/03/1990.jpg" 
                type="begin"
                name="иванова татьяна ивановна"
                date={Date.now()}
            />
            <ChatMessage 
                img="https://www.proza.ru/pics/2017/06/03/1990.jpg" 
                type="stop"
                name="иванова татьяна ивановна"
                callTime="01:25"
                date={Date.now()}
            />
            <ChatMessage 
                img="https://www.proza.ru/pics/2017/06/03/1990.jpg" 
                type="stop"
                name="иванова татьяна ивановна"
                callTime="01:25"
                date={Date.now()}
                isMy
            />
            
        </div>
    ))