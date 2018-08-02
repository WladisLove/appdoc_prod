import React from 'react';
import { storiesOf } from '@storybook/react';
import Spinner from '../';




storiesOf('Spinnner', module)
    .add('default', () => (
        <div>
           <Spinner/>
        </div>
    ))
    .add('small', () => (
		<div>
			<Spinner size="small"/>
		</div>
    ))
    .add('large', () => (
        <div>
           <Spinner size="large"/>
        </div>
    ));
