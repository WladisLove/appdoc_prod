import React from 'react';
import { storiesOf } from '@storybook/react';

import DatePickerNew from '../';



storiesOf('DatePickerNew', module)
    .add('DatePickerNew', () => (
		<div>
			<DatePickerNew width="10%" bubbleplaceholder="ФИО"/>

		</div>
    ));

