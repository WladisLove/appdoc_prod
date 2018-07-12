import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router';

import RegistrationComplete from '../';

storiesOf('RegistrationComplete', module)
    .addDecorator(story => (
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    ))
    .add('RegistrationForget', () => (
        <div>
            <RegistrationComplete text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." phone='+ 375 17 567 55 44'
                                  onSubmit={action('onSubmit')}  />
        </div>
    ))