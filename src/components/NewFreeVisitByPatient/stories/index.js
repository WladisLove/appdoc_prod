import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NewFreeVisitByPatient from '../';

// import {historyArr} from './mock-data'

storiesOf('NewFreeVisitByPatient', module)
    .add('NewFreeVisitByPatient', () => (
        <div>
            <NewFreeVisitByPatient
                docTypes = {["Аллерголог", "Хирург", "Терапевт", "Окулист"]}
                visible = {true}
                onCancel = {console.log("cancel")}
            />
        </div>
    ))