import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Select from '../';
const Option = Select.Option;

storiesOf('Select', module)
    .add('Select', () => (
		<Select defaultValue="Длительность приема">
		  <Option value="5 мин">5 мин</Option>
		  <Option value="15 мин">15 мин</Option>
		</Select>
    ))
    .add('MultiSelect', () => (
		<Select mode="multiple" defaultValue="Длительность приема">
		  <Option value="5 мин">5 мин</Option>
		  <Option value="10 мин">10 мин</Option>
		  <Option value="15 мин">15 мин</Option>
		</Select>
    ))