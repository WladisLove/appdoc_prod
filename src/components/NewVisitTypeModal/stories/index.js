import React from 'react';
import {storiesOf} from '@storybook/react';
import NewVisitTypeModal from '../';


storiesOf('Modal - NewVisitTypeModal', module)
    .add('modal', () => (
        <div>
            <NewVisitTypeModal visible={true}

            />
        </div>
    ));