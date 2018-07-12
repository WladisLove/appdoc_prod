import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningModal from '../';

storiesOf('Modal - WarningModal', module)
    .add('modal', () => (
        <div>
            <WarningModal visible={true}
                          message='Изменения всупят в силу после проверки администратором'/>
        </div>
    ));