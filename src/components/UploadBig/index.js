import React from 'react'
import {Upload} from 'antd';
import PropTypes from 'prop-types'

import Icon from '../Icon'

import './styles.css'

class UploadBig extends React.Component {
    state = {
        previewImage: '',
        fileList: [],
    };

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
        });
    };

    handleChange = ({fileList}) => {
        this.setState({fileList});
        this.props.onChange({fileList})
    }

    render() {
        const {previewImage, fileList, name} = this.state;


        const uploadButton = (
            <div className='upload-btn' title='Загрузить файл'>
                <Icon type="add-button" size={40} svg/>
            </div>
        );
        return (
            <div className="upload">
                <Upload className="upload-block"
                        action=""
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        name={name}
                >
                    {fileList.length >= this.props.limit ? null : uploadButton}
                </Upload>
            </div>
        );
    }
}

UploadBig.propTypes = {
    limit: PropTypes.number,
};

UploadBig.defaultProps = {
    limit: 5,
};

export default UploadBig;