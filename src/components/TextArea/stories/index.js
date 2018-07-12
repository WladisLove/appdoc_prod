import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TextArea from '../';

storiesOf('TextArea', module)
    .add('default', () => (
        <div>
            <TextArea label='Текст'/>
        </div>
    ));