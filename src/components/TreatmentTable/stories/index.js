import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TreatmentTable from '../';

import {treatmentArr} from './mock-data'

storiesOf('TreatmentTable', module)
    .add('TreatmentTable', () => (
        <div>
            <TreatmentTable data={treatmentArr} 
                        onGoto={(id) => console.log(id)}
                        onGotoChat = {(id) => console.log(id)}/>
        </div>
    ))