import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import './style.css'


class Spinner extends Spin{
    constructor(props){
        super(props);
    }


    render() {

        return (
            <div>
                <Spin {...this.props}/>
            </div>
        )
    }
}

// Input.propTypes = {
//     className: PropTypes.string,
// };
//
// Input.defaultProps = {
//     className: '',
// };

export default Spinner;