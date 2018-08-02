import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Modal from '../';

storiesOf('Modal', module)
    .add('Modal', () => (
        <div>
            <Modal title="Basic Modal"
                   visible={true}>
                <div>Some contents...</div>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    ))