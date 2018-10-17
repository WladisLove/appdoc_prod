import React from 'react';
import { storiesOf } from '@storybook/react';

import InputDateWithToolTip from '../';
storiesOf('InputDateWithToolTip', module)
    .add('InputDateWithToolTip', () => (
		<div>
			<InputDateWithToolTip width="20%" placeholder="ФИО"/>

		</div>
    ))

