import React from 'react'
import { storiesOf } from '@storybook/react'

import Icon from '../'
import {iconList} from './iconList'

const styles = {
    display:'inline-block',
    margin:5,
    padding:5,
    border:'1px black solid',
    textAlign:'center',
};

storiesOf('Icon', module)
    .add('Custom SVG icon', () => <div>
        {iconList.map(type => (
            <div key={type} style={styles}>
                <Icon svg type={type} size={30} />
                <p>{type}</p>
            </div>
        ))}
    </div>)
    .add('Antd icons', () => <Icon type="check" />);