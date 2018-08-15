import React from 'react';
import { storiesOf } from '@storybook/react';
import CompletionAdmission from '../';
import moment from 'moment';

const rangeSet = {
    placeholderStart: 'Начало',
};
storiesOf('Modal - CompletionAdmission', module)
    .add('modal', () => (
        <div>
            <CompletionAdmission 
                visible={true}
                onSave={e => console.log(e)}/>
        </div>
    ));
