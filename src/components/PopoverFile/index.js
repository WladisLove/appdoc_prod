import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import DownloadLink from '../DownloadLink'
import Button from '../Button'

import {Popover, message} from 'antd';

import './style.css'
import Upload from "../Upload";
import Spinner from "../Spinner";

class PopoverFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            num: props.data.reduce((res, elem) => {
                return !elem.downloaded ? res + 1 : res
            }, 0)
        };
    }


    downloadClickHandler = () => {
        this.setState({num: this.state.num -1});
        this.props.onDownload();
    };

    renderLinks = (dataArr) => {
        return dataArr.map((item, index) =>
            (<DownloadLink {...item}
                                       size="default"
                                       type="link"
                                       svg
                                       icon="file"
                                       iconSize={16}
                                       download
                                       onClick={this.downloadClickHandler}
                                       key={item.id + '' + index}/>)
        );
    };
    handleChange = (file) => {
        this.setState({loading: true});
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
            file={thumbUrl: reader.result, name: file.name};
            this.props.onAddFiles(file, this.props.id_app)
                .then((res)=> {
                    console.log(res, "RES UPLOADING FILE");
                    this.setState({loading: false});
                    if(res.data.code===200) {
                        message.success("Файл успешно добавлен");
                        this.props.refresh();
                    } else {
                        message.error("При загрузке файла произошла ошибка, попробуйте ешё раз")

                    }

                    console.log(res)
                });
        });



    };
    handleVisibleChange = (visible) => {
        this.props.canAddFiles ? this.setState({visible}) : (this.props.data.length && this.setState({visible}));
    };

    render() {
        return (
            <Popover
                content={
                    <div className='popover-file-body'>
                        <div className='popover-file-block'>
                            {this.renderLinks(this.props.data ? this.props.data: null)}
                        </div>
                        {!!this.props.data.length && <Button
                            onClick={() => console.log('hello', this.props)}
                            size='file'
                            type='file'
                            icon='download'
                            svg
                            iconSize={23}
                        />}
                        {this.props.canAddFiles && !!this.props.id_app &&
                        <div className="add-files">
                            <Upload className="add-new-file-upload"
                                    onChange={({file}) => this.handleChange(file)}
                                    listType='text'
                                    text="Добавить файл"/>
                            {this.state.loading && <Spinner size="small" isInline={true} />}
                        </div>}
                    </div>}
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
                placement="bottomRight"
            >
                <div className='popover-btn'>
                    {this.props.children}
                    <Button onClick={() => {}}
                            btnText=''
                            size='icon'
                            type='icon'
                            icon='file-download'
                            svg
                            iconSize={32}
                            title="Скачать все файлы"
                    />

                    <div className={'popover-num active'}>
                        {this.props.data.length}
                    </div>
                </div>
            </Popover>
        );
    }
}


PopoverFile.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    onDownload: PropTypes.func,

};

PopoverFile.defaultProps = {
    data: [],
    onDownload: () => {},
};

export default PopoverFile
