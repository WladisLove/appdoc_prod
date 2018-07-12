import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TreatmentTableItem from '../';

const filse =[
        {
            btnText: "Файл1.doc",
            href: 'load'

        },{
            btnText: "Прикрепленный Файл1.doc",
            href: 'load'
        },{
            btnText: "Прикрепленный Файл1.pdf",
            href: 'load'
        },{
            btnText: "Прикрепленный Файл1.doc",
            href: 'load'
        },{
            btnText: "Прикрепленный Файл1.pdf",
            href: 'load'
        },
    ]

storiesOf('TreatmentTableItem', module)
    .add('TreatmentTableItem', () => (
        <div>
            <TreatmentTableItem 
                name="Иванова А. К." 
                date="15.09.2017"
                time="15:00-16:00"
                type='chat1'
                diagnostic='Сахарный диабет'
                comments='Lorem ipsum dolor sit amet, consectetuer adipiscing elit.'
                price='112 руб.'
                conclusion={null}
                review='Lorem ipsum dolor sit amet, consectetuer...'
                rating={3}
                files={filse}
                onGoto={()=>console.log('click')}
                onGotoChat={(id)=>console.log('gotoChat',id)}
            />

            <TreatmentTableItem 
                name="Иванова А. К." 
                date="15.09.2017"
                time="15:00-16:00"
                type='chat1'
                diagnostic='Сахарный диабет'
                comments='Lorem ipsum dolor sit amet, consectetuer adipiscing elit.'
                price='112 руб.'
                conclusion={
                    {Name: 'eeeeee.txt',
                    link: ''}
                }
                review='Lorem ipsum dolor sit amet, consectetuer...'
                rating={null}
                files={filse}
                onGoto={()=>console.log('click')}
            />
        </div>
    ))