import React from 'react';
import { storiesOf } from '@storybook/react';

import InputNew from '../';
storiesOf('InputNew', module)
    .add('InputNew', () => (
		<div>
			<InputNew width="20%" bubbleplaceholder="ФИО"/>

		</div>
    ))

