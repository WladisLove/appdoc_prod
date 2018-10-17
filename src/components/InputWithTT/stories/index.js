import React from 'react';
import { storiesOf } from '@storybook/react';

import InputWithTT from '../';
storiesOf('InputWithToolTip', module)
    .add('InputWithToolTip', () => (
		<div>
			<InputWithTT width="20%" placeholder="ФИО"/>

		</div>
    ))

