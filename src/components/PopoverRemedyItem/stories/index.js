import React from 'react';
import { storiesOf } from '@storybook/react';

import PopoverRemedyItem from '../';

storiesOf('PopoverRemedyItem', module)
    .add('PopoverRemedyItem', () => (
        <div style={{ padding: '30px' }}>
            <PopoverRemedyItem
                namePharmacy='Белфармация Аптека N6 (филиал 1)'
                pricePharmacy='5,72 руб'
                adressPharmacy='г. Минск, проспект Рокоссовского, д. 5/1'
            />
        </div>
    ))