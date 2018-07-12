import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SwitchPanel from '../';

storiesOf('SwitchPanel', module)
    .add('default', () => (
        <div>
           <SwitchPanel icon='emergency-call'
                        title="Экстренные вызовы"/>
        </div>
    ))
    .add('already checked', () => (
        <div>
            <SwitchPanel icon='phone'
                         title="Экстренные вызовы"
                         defaultChecked={true}/>
        </div>
    ));