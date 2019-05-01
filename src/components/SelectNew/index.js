import React from 'react'
import PropTypes from 'prop-types'
import {Select as AntSelect} from "antd"
import { Translate } from 'react-localize-redux'
import './style.css'

const Option = AntSelect.Option;
class SelectNew extends AntSelect{
    constructor(props){
        super(props);
        this.state ={
            onFocus: false
        }
    }

    renderOptions = (data) => {    
        let dataArr = [];
        
        data.forEach((item, index) => {
            
            if(item instanceof Object && item.hasOwnProperty('title')){
                
                    dataArr.push( <Option value={item.id} key = {index}><Translate id={item} /></Option>)
            }
            else{
                    dataArr.push( <Option value={item} key = {index}><Translate id={item} /></Option>)
            }
            
        });
        return dataArr
    };

    handleChange = (value) => {
        this.setState({select: value});
        this.props.onChange(value)
    };
    render() {
        const inputClassName = (this.state.select || this.props.value ? "effect has-content" : "effect");
        const rootCl = "new-input input-effect" +" "+ this.props.className + " " +  'input-root ';

        let data = [...this.props.data];
        data = data.map((el) => {
            if(el instanceof Object) return el.id
            return el
        })
        return (
            <div className={rootCl}
                 style={{width:this.props.width ? this.props.width : null}}
            >
                <AntSelect
                    {...this.props}
                    showSearch
                    mode={this.props.mode || null}
                    style={{ width: "100%" }}
                    placeholder=""
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    className={inputClassName}
                    ref = {sel => this.sel = sel}
                    onChange={this.handleChange}
                    defaultValue={data}
                >
                    {this.renderOptions(this.props.data)}
                </AntSelect>
                <label>{this.props.bubbleplaceholder}</label>


            </div>
        )
    }
}

SelectNew.propTypes = {
    className: PropTypes.string,
};

SelectNew.defaultProps = {
    className: '',
};

export default SelectNew
