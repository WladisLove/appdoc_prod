import React from 'react';
import { storiesOf } from '@storybook/react';
import ReportBugModal from '../';

storiesOf('Modal - Report a bug', module)
    .add('Report a bug', () => (
        <div>
            <ReportBugModal onSend={(e) => console.log(e)}
                            visible={true}
            />
        </div>
    ));