import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TopPanelPatientItem from '../';

import {dataArr} from './mock-data'

storiesOf('TopPanelPatientItem', module)
    .add('TopPanelPatientItem', () => (
          <div>
            <TopPanelPatientItem
                className={dataArr.className}
                num={dataArr.num}
                text={dataArr.text}
            >
            </TopPanelPatientItem>
          </div>
    ))