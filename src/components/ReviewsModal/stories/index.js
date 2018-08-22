import React from 'react';
import { storiesOf } from '@storybook/react';
import ReviewsModal from '../';
import moment from 'moment';


storiesOf('Modal - ReviewsModal', module)
    .add('modal', () => (
        <div>
            <ReviewsModal visible={true}
                              rangeSet={[

                              ]}
                              onSave={e => console.log(e)}/>
        </div>
    ));
