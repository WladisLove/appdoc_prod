import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Tabs from '../';

const TabPane = Tabs.TabPane;

storiesOf('Tabs', module)
    .add('basic', () => (<div>
            <Tabs defaultActiveKey="1" onChange={action('active')}>
                <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
        </div>
    ))