import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AddNewDoctor from '../';

import {doctorsArr} from './mock-data'

storiesOf('Modal - AddNewDoctor', module)
    .add('modal', () => (
        <div>
            <AddNewDoctor data={doctorsArr} visible={true} onAdd={(obj)=>console.log('eee',obj)}/>
        </div>
    ));