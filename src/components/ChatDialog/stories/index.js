import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ChatDialog from '../';

let obj = {
    
        id: 126012,
        fio: "тестовый пациент",
        avatar: "https://178.172.235.105/media/img/zaglushka.jpg",
        start: "1525690510",
        end: 1525433630,
        id_doc: "2697",
        id_user: "2663",
        del: "1",
        comment: "Подозрения на бронхит",
        delComment: "",
        diagnosis: null,
        type: "video"
    
}

storiesOf('ChatDialog', module)
    .add('extra', () => (
        <div>
            {/*<ChatDialog 
                img="https://www.proza.ru/pics/2017/06/03/1990.jpg" 
                name="Иванова А. К." 
                consultation="Консультация по результатам анализа..." 
                time="15:00"
                status='extra'
                iconType='chat1'
                onGoto={() => console.log('eee')}
            />*/}
            <ChatDialog 
                {...obj}
                onGoto={(id) => console.log('onGoto', id)}
                onGotoChat={(id) => console.log('onGotoChat', id)}
            />
        </div>
    ))
    /*.add('soon', () => (
        <div>
            <ChatDialog 
                img="https://www.proza.ru/pics/2017/06/03/1990.jpg" 
                name="Иванова А. К." 
                consultation="Консультация по результатам анализа..." 
                time="через 10 мин"
                status='soon'
                iconType='chat1'
            />
        </div>
    ))

    .add('default', () => (
        <div>
            <ChatDialog 
                img="https://www.proza.ru/pics/2017/06/03/1990.jpg" 
                name="Иванова А. К." 
                consultation="Консультация по результатам анализа..." 
                time="15:00"
                status='default'
                iconType='chat1'
            />
        </div>
    ))*/