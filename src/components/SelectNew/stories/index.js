import React from 'react';
import { storiesOf } from '@storybook/react';

import SelectNew from '../';
storiesOf('SelectNew', module)
    .add('SelectNew', () => (
		<div>
			<SelectNew width="100%" bubbleplaceholder="ФИО"/>

		</div>
    ));

