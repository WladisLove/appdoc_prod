import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TopPanelItem from '../';

storiesOf('TopPanelItem', module)
    .add('TopPanelItem', () => (
          <div>
            <TopPanelItem
                className='first-col'
                PanelTitle="Актуальные обращения"
                PanelText="2"
                svg
                icon='clock'
            >
            </TopPanelItem>
          </div>
    ))