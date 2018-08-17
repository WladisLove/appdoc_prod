import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from "moment"
import ScrollArea from 'react-scrollbar'

import DownloadLink from '../DownloadLink'

import './style.css'
import '../../icon/style.css'

const ChatFiles = (props) => {
        const {date, data, attachment, status} = props;
        const rootClass = cn('chat__files-item', `chat__files-${status}`);

        return (
            <div className={rootClass}>
                <div className='chat__files-date'>
                    {moment(date*1000).format('DD.MM.YYYY')}
                </div>
                <div className='chat__files-attachment'>
                    {attachment}
                    {
                        data.map(el => {
                            const isConcl = el.conclusion;
                            return (<DownloadLink
                                {...el}
                                key={el.href}
                                conclusion = {isConcl ? "link-conclusion" : ''}
                                size="default" 
                                type="link"
                                download
                                svg
                                icon={isConcl ? 'result2' :"file"}
                                iconSize={isConcl ? 31 : 11}
                            />)
                        })
                    }
                </div>
            </div>
        )
}

ChatFiles.propTypes = { 
    data: PropTypes.array,
    attachment: PropTypes.string,
    status: PropTypes.oneOf(['default', 'new']),
};

ChatFiles.defaultProps = {
    data: [],
    attachment: '',
    status: 'default'
};

export default ChatFiles