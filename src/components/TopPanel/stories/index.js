import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TopPanel from '../';
import {panelArr} from './mock-data'

storiesOf('TopPanel', module)
    .add('TopPanel', () => (
          <div>
              <TopPanel {...panelArr}/>
          </div>
    ))