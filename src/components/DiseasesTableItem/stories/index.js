import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DiseasesTableItem from '../';

storiesOf('DiseasesTableItem', module)
    .add('DiseasesTableItem', () => (
        <div>
            <DiseasesTableItem 
                date="15.09.2017"
                diseases='Хроническое заболевание длинное название длинное название.'
            />
        </div>
    ))