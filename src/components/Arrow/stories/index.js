import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ArrowGroup from '../';

storiesOf('Arrow', module)
    .add('Arrow', () => (
            <div className="flexTest">
                <ArrowGroup
                        type='dark-blue'
                />
            </div>

    ))