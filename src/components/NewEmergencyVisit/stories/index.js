import React from 'react';
import { storiesOf } from '@storybook/react';
import NewEmergencyVisit from "../index";


storiesOf('NewEmergencyVisit', module)
    .add('NewEmergencyVisit', () => (
        <div>
            <NewEmergencyVisit
                visible = {true}
                onCancel = {console.log("cancel")}
            />
        </div>
    ));