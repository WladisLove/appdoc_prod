import React from 'react';
import { storiesOf } from '@storybook/react';

import RangeDPNew from '../';
storiesOf('RangeDPNew', module)
    .add('RangeDPNew', () => (
		<div>
			<RangeDPNew width="20%" placeholder="Начало обучения"/>

		</div>
    ))

