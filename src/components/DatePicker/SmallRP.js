import React from 'react'
import PropTypes from 'prop-types'

import Icon from '../Icon'
import {DatePicker} from 'antd'
const { RangePicker } = DatePicker;

class SmallRP extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            values: this.props.defaultValue,
        }
    }

    RPHandler = (values) => {
        this.setState({values});
        this.props.onChange(values);
    };

    componentWillReceiveProps(nextProps){
        if(!nextProps.defaultValue.length && this.state.values.length){
            this.RPHandler([]);
        }
    }

    render() {

        return (
            <div style={{width:250}}>
                <Icon type="calendar" svg size={19}/>
                <div className={this.props.className}>
                    <RangePicker format={this.props.format}
                                 onChange={this.RPHandler}
                                 value={this.state.values}
                                 allowClear={false}/>
                </div>
                <Icon type="circle_close" svg size={15}
                      onClick={() => this.RPHandler([])}/>
            </div>
        )
    }
}

SmallRP.propTypes={
    defaultValue: PropTypes.array,
};

SmallRP.defaultProps={
    defaultValue: [],
};

export default SmallRP;