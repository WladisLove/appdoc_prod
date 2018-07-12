import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TopPanelPatientPopover from '../';

import {dataArr} from './mock-data'

storiesOf('TopPanelPatientPopover', module)
    .add('TopPanelPatientPopover', () => (
          <div>
            <TopPanelPatientPopover 
                title={dataArr.title} />
          </div>
    ))