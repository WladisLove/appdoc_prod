import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import { Select } from 'antd';

import './style.css'

const Option = Select.Option;


class SelectWithTT extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            focused: false,
            value: ""
        }
    }

    onChange = (value) => {
        console.log(value);
        if(value) {
            this.setState({value});
            //this.props.onChange && this.props.onChange(value)

        } else {
            this.setState({focused: false, value: ""})
        }
    };

    render() {
        const labelClassName = this.state.value ? "bubble" : "";
        return (
            <div className = "new-select-wrapper input-effect">
                <Select onChange={this.onChange} dropdownClassName="new-select-variants" mode={this.props.mode}>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled">Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                    <Option value="lucy1">Lucy</Option>
                    <Option value="disabled2">Disabled</Option>
                    <Option value="Yiminghe3">yiminghe</Option>
                    <Option value="lucy4">Lucy</Option>
                    <Option value="disabled5">Disabled</Option>
                    <Option value="Yiminghe6">yiminghe</Option>
                    <Option value="lucy7">Lucy</Option>
                    <Option value="disabled8">Disabled</Option>
                    <Option value="Yiminghe9">yiminghe</Option>

                </Select>
                <button data-tip={this.props.tooltip || ""} className='note' >?</button>
                <label className={labelClassName}>{this.props.bubbleplaceholder || ""}</label>
                <ReactTooltip place="top" type="dark" effect="float"/>
            </div>
        )
    }
}

SelectWithTT.propTypes = {
    className: PropTypes.string,
};

SelectWithTT.defaultProps = {
    className: '',
};

export default SelectWithTT