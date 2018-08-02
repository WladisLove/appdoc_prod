import React from 'react'
import PropTypes from 'prop-types'

import { Rate as AntRate} from 'antd'
import Icon from '../Icon'
import './styles.css'

class Rate extends React.Component{
    //if (props.character)
    state = {
        rate: this.props.defaultValue,
    }

    componentWillReceiveProps(nextProps){
        (this.props.defaultValue !== nextProps.defaultValue) && this.setState({rate: nextProps.defaultValue})
    }

    render(){
        return(
            <AntRate {...this.props} 
                    defaultValue={this.state.rate}
                    character={this.props.character 
                        || <Icon type="star" 
                                    size={this.props.starSize} 
                                    svg/>}/>
        )
    }
};

Rate.propTypes = {
    starSize: PropTypes.number,
    defaultValue: PropTypes.number,
    disabled: PropTypes.bool,
};

Rate.defaultProps = {
    starSize: 10,
    defaultValue: 0,
    disabled: false,
};

export default Rate;