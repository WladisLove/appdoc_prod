import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ChatFiles from '../';

const arr = [{
    date: Date.now() / 1000,
    data: [{
        href: "#",
        btnText: "файл.txt"
    },{
        href: "#",
        btnText: "файл2.txt"
    },{
        href: "#",
        btnText: "заключение.txt",
        conclusion: true
    }]
},{
    date: Date.now() / 1000,
    data: [{
        href: "#",
        btnText: "файл11.txt"
    },{
        href: "#",
        btnText: "файл12.txt"
    },{
        href: "#",
        btnText: "заключение11.txt",
        conclusion: true
    }]
}]

storiesOf('ChatFiles', module)
    .add('default', () => (
        <div>
            {arr.map(el => {
                return (<ChatFiles
                    status='new'
                    {...el}
                />)
            })}

        </div>
    ))