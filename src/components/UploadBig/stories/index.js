import React from 'react';
import { storiesOf } from '@storybook/react';
import UploadBig from '../';

storiesOf('UploadBig', module)
    .add('upload', () => (
        <div>
            <UploadBig onChange={e => console.log(e)}/>
        </div>
    ));