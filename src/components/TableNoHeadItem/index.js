import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'
import { Translate } from 'react-localize-redux'
import ProfileAvatar from '../ProfileAvatar'
import Button from '../Button'
import Icon from '../Icon'

import './style.css'
import '../../icon/style.css'

class TableNoHeadItem extends React.Component{

    onBeginHandler = (e) => {
        e.preventDefault();
        this.props.onBegin(this.props.id);
    }

    onCancelHandler = (e) => {
        e.preventDefault();
        this.props.onCancel(this.props.id);
    }

    render(){
        //const {img, type, name, infoText, size, online, title, time, id_p, onGoto} = this.props;
        const {
            comment,
            end,
            fio,
            id,
            id_doc,
            id_user,
            start,
            type,
            img,
            avatar,
            online,
            status_user,
            onGoto,
        } = this.props;
        const key_val = {
            'chat': 'chat1',
            'voice': 'telephone',
            'video': "video-camera",
        }
        const isOnline = status_user === undefined ? !!online : !!status_user;
        const photo = avatar ? avatar : img;

        return (<div>
            <Translate>
                {({ translate }) =>
                    (<div className='schedule'>
                        <ProfileAvatar id={id_user} owner="patient" online={isOnline} img={photo} size={'small'}/>
                        <div className="flex-col">
                            <div className="patient-name">
                                <div onClick={() => onGoto(id_user)} className='go-to'>{fio}</div>
                            </div>
                            <div className="patient-info">{comment}</div>
                        </div>
                        <div className="flex-col ml-a">
                            <div className="patient-time">{moment((+start)*1000).format('HH:mm')}</div>
                        </div>
                        <div className="flex-col"><Icon svg type={key_val[type]} size={16} title='title'/></div>
                        <div className="flex-col">
                            <Button
                                onClick={this.onBeginHandler}
                                btnText={translate('button.title.startReception')}
                                size='default'
                                type='float'
                            />
                        </div>
                        <div className="flex-col" onClick={this.onCancelHandler}>
                            <div className='go-to'>{translate('button.title.cancel')}</div>
                        </div>
                    </div>)
                }
            </Translate>
        </div>)
    }
}

TableNoHeadItem.propTypes = {

    comment: PropTypes.string,
    end: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    fio: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    id_doc: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    id_user: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    start: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.string,
    img: PropTypes.string,

    onBegin: PropTypes.func,
    onCancel: PropTypes.func,
    onGoto: PropTypes.func,
};

TableNoHeadItem.defaultProps = {
    comment: '',
    end: 0,
    fio: '',
    id: 0,
    id_doc: 0,
    id_user: 0,
    start: 0,
    img: '',

    onBegin: () => {},
    onCancel: () => {},
    onGoto: () => {},
};

export default TableNoHeadItem
