import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import ScrollArea from 'react-scrollbar'

import DownloadLink from '../DownloadLink'

import './style.css'
import '../../icon/style.css'

class ChatFiles extends React.Component{
    render(){
        const {date, attachment, status} = this.props;
        const rootClass = cn('chat__files-item', `chat__files-${status}`);

        return (
            <div className={rootClass}>
                <div className='chat__files-date'>
                    {date}
                </div>
                <div className='chat__files-attachment'>
                    {attachment}
                    <DownloadLink
                        btnText="Прикрепленный файл с длинным предлинным названием.doc"
                        size="default" 
                        type="link"
                        download
                        svg
                        icon="file"
                        iconSize={11}
                    />
                    <DownloadLink
                        btnText="Прикрепленный файл с длинным предлинным названием.doc"
                        size="default" 
                        type="link"
                        download
                        svg
                        icon="file"
                        iconSize={11}
                    />

                    <DownloadLink conclusion='link-conclusion'
                        btnText="Заключение 141423.doc"
                        size="default" 
                        type="link"
                        download
                        svg
                        icon="result2"
                        iconSize={31}
                    />
                </div>
            </div>
        )
    }
}

ChatFiles.propTypes = {
    date: PropTypes.string,
    attachment: PropTypes.string,
    status: PropTypes.oneOf(['default', 'new']),
};

ChatFiles.defaultProps = {
    date: '',
    attachment: '',
    status: 'default'
};

export default ChatFiles