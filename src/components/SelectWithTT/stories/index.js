import React from 'react';
import { storiesOf } from '@storybook/react';

import SelectWithTT from '../';
storiesOf('SelectWithTT', module)
    .add('SelectWithTT', () => (
		<div>
			<SelectWithTT placeholder="ФИО"/>

		</div>
    ))

