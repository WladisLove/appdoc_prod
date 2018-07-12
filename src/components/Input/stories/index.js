import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Input from '../';
const { TextArea } = Input;
storiesOf('Inputs', module)
    .add('Search', () => (
        <div>
           <Input.Search
		      placeholder="Поиск..."
		    />
        </div>
    ))
    .add('Input', () => (
		<div>
			<Input addonAfter="After" value='testestestes' addonBefore='Before'/>
			<Input placeholder="Enter smth" />
		</div>
    ))
    .add('Input2', () => (
        <div>
            <Input addonBefore="ФИО" value='asdasdad' readOnly/>
        </div>
    ));
