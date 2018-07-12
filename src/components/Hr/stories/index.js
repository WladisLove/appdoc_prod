import React from 'react'
import { storiesOf } from '@storybook/react'

import Hr from '../'

storiesOf('Hr', module)
    .add('default', () => <div>
        text
        <Hr/>
        text2

    </div>);