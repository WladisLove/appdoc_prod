import React from 'react';
import PropTypes from 'prop-types'
import PopoverRemedy from '../PopoverRemedy'

import {Popover} from 'antd';

import './style.css'

class PopoverRemedyButton extends React.Component {

    state = {
        visible: false,
    };

    handleVisibleChange = (visible) => {
        this.setState({visible});
    };


    filesRender = (dataArr) => {
        let remedyArr = [];

        dataArr.map((item, index) => { 
            remedyArr.push(<PopoverRemedy {...item}  key={item.id + ''+index}/>)
        });

        return remedyArr;
	};

    render() {
        return (
            <Popover
                content={this.filesRender(this.props.data)}
                className='popover_remedy'
                trigger="click"
                onVisibleChange={this.handleVisibleChange}
                placement="rightTop"
            >
                {this.props.children}
            </Popover>
        );
    }
}


PopoverRemedyButton.propTypes = {
    data: PropTypes.object,
    onClose: PropTypes.func,
    onEmail: PropTypes.func,
    onPhone: PropTypes.func,
};

PopoverRemedyButton.defaultProps = {
    data: {},
    onClose: () => {
    },
    onEmail: () => {
    },
    onPhone: () => {
    },
};

export default PopoverRemedyButton
