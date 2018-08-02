import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Accordion from '../';
const Panel = Accordion.Panel;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

storiesOf('Accordion', module)
    .add('Accordion', () => (
        <div>
            <Accordion defaultActiveKey={['1']}>
                <Panel header="Контакты" key="1">
                    <p>{text}</p>
                </Panel>
                <Panel header="Образование" key="2">
                    <p>{text}</p>
                </Panel>
                <Panel header="Опыт работы" key="3">
                    <p>{text}</p>
                </Panel>
            </Accordion>
        </div>
    ))