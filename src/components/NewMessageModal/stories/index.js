import React from 'react';
import { storiesOf } from '@storybook/react';
import NewMessageModal from '../';

storiesOf('Modal - NewMessageModal', module)
    .add('modal', () => (
        <div>
            <NewMessageModal visible={true}
                            id={1}
                             userName='Петров-Иванов Александр Константинович'
                             onSend={(e) => console.log(e)}
            />
        </div>
    ));