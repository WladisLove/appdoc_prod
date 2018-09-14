import React from 'react';
import { storiesOf } from '@storybook/react';

import CreateProfile from '../';

storiesOf('CreateProfile', module)
    .add('CreateProfile', () => (
        <div>
            <CreateProfile />
        </div>
    ));
