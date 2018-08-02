import React from 'react'
import {Row as AntRow} from 'antd'

const Row = (props) => {
    return (<AntRow gutter={15} {...props}>{props.children}</AntRow>)
};

export default Row;