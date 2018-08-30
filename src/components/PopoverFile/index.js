import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import DownloadLink from '../DownloadLink'
import Button from '../Button'

import {Popover} from 'antd';

import './style.css'

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

    handleVisibleChange = (visible) => {
        this.props.data.length && this.setState({visible});
    };

    render() {
        const popoverNumCl = cn('popover-num', this.state.num && 'active');

        return (
            <Popover
                content={
                    <div className='popover-file-body'>
                        <div className='popover-file-block'>
                            {this.renderLinks(this.props.data ? this.props.data: null)}
                        </div>
                        <Button
                            onClick={() => console.log('hello', this.props)}
                            size='file'
                            type='file'
                            icon='download'
                            svg
                            iconSize={23}
                        />
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
                    <div className={popoverNumCl}>
                        {this.state.num ? ('+' + this.state.num) : this.props.data.length}
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
