import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PatientHistoryReceptions from '../';

import {historyArr} from './mock-data'

storiesOf('PatientHistoryReceptions', module)
    .add('PatientHistoryReceptions', () => (
        <div>
            <PatientHistoryReceptions  data={historyArr} />
        </div>
    ))