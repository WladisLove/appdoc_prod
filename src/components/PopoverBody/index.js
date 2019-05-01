import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'
import Button from '../Button'
import Icon from '../Icon'
import { Translate } from 'react-localize-redux'

import './style.css'


const PopoverBody = (props) => {

	  const {id, id_user, fio, comment, start, end, onEmail, onGoto} = props;
	  const icons = ['chat1', 'telephone', "video-camera"];
	  const key_val = {
		'chat' : 'chat1',
		'voice': 'telephone',
		'video': "video-camera",
	}

    return (
      <div className='calendar-body'>
			<div onClick={() => onGoto(id_user)} className='go-to calendar-name'>{fio}</div>
			<div className='calendar-date'>
				{moment(start).format('DD MMMM')}
				<div className = 'iconwrapper'>
					<Icon svg type={key_val[props.type]} size={21} />
				</div>

			</div>

			<div className='calendar-time'>
				{moment(start).format('HH mm')} - {moment(end).format('HH mm')}
				</div>
			<div className='calendar-text'>{comment}</div>

			<div className='calendar-block'>
				<Translate>
						{({ translate }) =>
								(<Button
									size='file'
									type='file'
									icon='mail'
									title={translate('button.title.sendMessage')}
									svg
									iconSize={16}
									onClick={onEmail}
								/>)
						}
				</Translate>
			</div>
		</div>
    );
};

PopoverBody.propTypes ={
    fio: PropTypes.string,
    comment: PropTypes.string,
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    onGoto: PropTypes.func,
};

PopoverBody.defaultProps = {
	id: 0,
    fio: '',
    comment: '',
    start: null,
    end: null,
	onGoto: () => {},
	type: 'chat1'
};

export default PopoverBody
