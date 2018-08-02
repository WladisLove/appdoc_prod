import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PatientAnalyzesPopover from '../';

import {panelArr} from './mock-data'

storiesOf('PatientAnalyzesPopover', module)
    .add('PatientAnalyzesPopover', () => (
          <div>
            <PatientAnalyzesPopover  data={panelArr} />
          </div>
    ))