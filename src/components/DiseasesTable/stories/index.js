import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DiseasesTable from '../';

import {diseasesArr} from './mock-data'

storiesOf('DiseasesTable', module)
    .add('DiseasesTable', () => (
        <div>
            <DiseasesTable data={diseasesArr}/>
        </div>
    ))