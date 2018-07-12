import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Steps from '../'

const steps = [{
    title: 'Контактная информация',
    content: 'First-content',
}, {
    title: 'Образование, опыт работы',
    content: 'Second-content',
}, {
    title: 'Проверка данных',
    content: 'Last-content',
}];

storiesOf('Step', module)
    .add('basic', () => (
	 <div>
		  <Steps steps = {steps} onFinish={action('Ready')}/>
      </div>
    ))