import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {MemoryRouter} from 'react-router';
import moment from 'moment'

import RegistrationForm from '../';

import {langs, payments} from './mock-data'

const DATA = {
    fio: "sdf",
    email: "sdf",
    phone: "sdf",
    address: "saf",
    sex: "m",
    datebirth: moment(),
    photos: undefined,
};

const fillNewField = (res, name) => {
    //console.log('in fillNewField')
    const data = DATA;
    const info = name.split('-');
    let array = [];
    if (res[info[0]])
        array = [...res[info[0]]];
    //console.log(info)
    array[+info[2]] = (info[1] === 'ucationyears' && data[name])
        ? {
            ...array[+info[2]],
            [info[1]]: [
                data[name][0] instanceof moment ? (data[name][0]).unix() : data[name][0],
                data[name][1] instanceof moment ? (data[name][1]).unix() : data[name][1],
            ],
        }
        : {
            ...array[+info[2]],
            [info[1]]: data[name],
        };
    return {
        ...res,
        [info[0]]: array,
    }
};

const onFinishHandler = () => {
    const data = DATA;

    let result = {};
    for (let key in data){
        result = (key.indexOf('educationsgroup')+1)
            ? fillNewField(result,key)
            : (key === 'workdate' || key === 'datebirth')
                ? {
                    ...result,
                    [key]: (data[key] instanceof moment) ? (data[key]).unix() : data[key],
                }
                : {
                    ...result,
                    [key]: data[key],
                };
    }
    //console.log(result)
};

storiesOf('Registration', module)
    .addDecorator(story => (
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    ))
    .add('Registration', () => (
        <div>
            <RegistrationForm onFinish={action('Submit values:')}
                              langs={langs}
                              payments={payments}
                              academicTitle = {[]}
                              finalText='Финальный текст для Checkbox'
            />
        </div>
    ))
.add('test',() =>(
    <div>
        {/*onFinishHandler()*/}
    </div>
))