import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TopPanelPatient from '../';
import {panelArr} from './mock-data'

storiesOf('TopPanelPatient', module)
    .add('Patient', () => (
          <div>
              <TopPanelPatient  data={panelArr}/>
          </div>
    ))