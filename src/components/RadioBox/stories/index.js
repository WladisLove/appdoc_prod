import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Radio from '../';

const RadioGroup = Radio.Group;


storiesOf('RadioGroup', module)
    .add('RadioGroup', () => (
        <div>
			<RadioGroup>
				<Radio value={1}>A</Radio>
				<Radio value={2}>B</Radio>
				<Radio value={3}>C</Radio>
				<Radio value={4}>D</Radio>
			</RadioGroup>
        </div>
    ))