import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router';

import PaymentForm from '../';

storiesOf('PaymentForm', module)
    .addDecorator(story => (
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    ))
    .add('Login', () => (
        <div>
            <PaymentForm onSubmit={action('Submit values:')}/>
        </div>
    ))