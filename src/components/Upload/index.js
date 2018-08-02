import React from 'react'
import PropTypes from 'prop-types'
import {Upload as AntUpload} from 'antd'
import cn from 'classnames'

import Button from '../Button'
import './styles.css'

class Upload extends React.Component{

    render(){
        const {className, text} = this.props;
        const clName = cn("uploadContent", className);


        return (
            <AntUpload className={clName}
                       fileList = {this.props.value ? this.props.value.fileList : []}
                       listType={this.props.listType}
                       onChange={this.props.onChange}
                       {...this.props}
            >
                <Button btnText={text}
                        size='upload'
                        type='upload'
                        icon='upload'
                        iconSize={36}
                        svg
                        onClick={e => e.preventDefault()}
                        />
            </AntUpload>
        )
    }
}

Upload.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    listType: PropTypes.string,
};

Upload.defaultProps = {
    className: '',
    text: '',
    listType: 'picture',
};

export default Upload;