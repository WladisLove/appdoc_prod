import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Radio from '../';

const icons = ['telephone', "video-camera", 'chat1'];

storiesOf('Radio', module)
    .add('btn', () => (
        <div>
            <Radio icons={icons}
                   onChange={e => console.log(e)}
                   defaultValue="video-camera"/>
        </div>
    ))