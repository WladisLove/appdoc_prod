import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'

import Button from '../Button'
import Rate from '../Rate'
import Icon from '../Icon'
import PopoverFile from '../PopoverFile'
import { Translate } from 'react-localize-redux'

import './style.css'
import '../../icon/style.css'
import Hoc from "../Hoc";
import {message} from "antd";

class HistoryReceptionsItems extends React.Component{

    handleClick = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }
    refactorFiles = (file) => {
        if(file.length > 1) {
            let files = [];
            file.forEach((item) => {
                    files.push(item)
            });
            return files
        } else return file
    };
    openModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const obj = {id_doc: this.props.id_doc, id_zap: this.props.id};
        this.props.showReviewModal(obj);
    }

    addConclusion = (file, translate) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const filesend = {name: file.name, thumbUrl: reader.result};
            this.props.addConclusion(this.props.id, filesend)
                .then((res)=>{
                    if(+res.data.code===200) {

                        message.success(translate("notifications.conclusionSuccessfulAdd"))
                    } else {
                        message.error(translate("notifications.anErrorOccurredTryAgain"))
                    }
                    this.props.refresh();
                })
        });
        reader.readAsDataURL(file);
    };

    render(){
        console.log(this.props)
        const {
            id_treatment,
            type,
            conclusion,
            cost,
            diagnostic,
            file,
            date,
            complaint,
            extr,
            begin,
            finish,
            comment,
            rate,
            onGotoChat,
            isUser,
        } = this.props;


        const key_val = {
            'chat': 'chat1',
            'voice': 'telephone',
            'video': "video-camera",
        }
        const conclusionMessage = isUser? <Translate id="notifications.waitConclusion" /> : 
        <Translate>
                {({ translate }) =>
                <div onClick={e=>{e.stopPropagation()}}>
                    <input type="file"
                        id="addConclusion"
                        style={{
                            width: "0.1px",
                            height: "0.1px",
                            opacity: 0,
                            overflow: "hidden",
                            position: "absolute",
                            zIndex: -1
                        }}
                        onChange={e => this.addConclusion(e.target.files[0], translate)}
                    />
                    <label htmlFor="addConclusion" className='btn btn-size-small btn-type-float'>
                        <span><Translate id="button.title.add" /></span>
                    </label>
                </div>}
        </Translate>

        const status = +moment(+date*1000).format("X") > +moment().format("X") ? "new" : conclusion ? "completed" : "topical";
        const statusClass = cn('patient-status', 'reception-status',`${status}`);
        return (
            <div className={"reception"}
                    onClick={(e) => {
                        onGotoChat(id_treatment)
                        this.handleClick(e);
                    }}
            >
                <div className="flex-col">
                    {extr && <div className="patient-status reception-status extra"></div>}
                    <div className={statusClass}></div>
                    <div className="patient-date">{moment(date*1000).format('DD.MM.YYYY')}</div>
                    <div className="patient-time">
                        {begin ? moment(+begin*1000).format('HH:mm') : moment(+date*1000).format('HH:mm')}
                        {finish ? `-${moment(finish*1000).format('HH:mm')}`: null}
                    </div>
                    <div className="patient-icon"><Icon svg type={extr?"emergency-call":key_val[type]} size={16}
                                                        style={extr?{color:"red"}:null}/></div>
                </div>
                <div className="flex-col">
                    <div className="patient-diagnostic">{diagnostic ? diagnostic:<span>&mdash;</span>}</div>
                </div>
                <div className="flex-col">
                    <div className="patient-comment">{complaint ? complaint:<span>&mdash;</span>}</div>
                </div>
                <div className="flex-col">
                    <div className="patient-price">{cost ? cost : <span>&mdash;</span>}</div>
                </div>
                <div className="flex-col">
                    <div className="patient-conclusion">
                        {
                            conclusion ? (
                                <a href={conclusion.href} download target="_blank" onClick={this.handleClick}>
                                    {conclusion.btnText}
                                </a>
                            ) : (moment().format("X") > moment(+date*1000).format("X")) ? <span>{conclusionMessage}</span>:<span>&mdash;</span>
                        }
                    </div>
                </div>
                <div className="flex-col">
                    {
                        rate ? (
                            <Hoc>
                                <Rate defaultValue={rate} disabled/>
                                <div className="patient-review">{comment}</div>
                            </Hoc>
                        ) : conclusion && isUser ? <Translate>{({ translate })=>(<Button btnText={translate('button.title.writeReview').toUpperCase()}
                                                  onClick={this.openModal}
                                                  size='small'
                                                  type='float'
                                                  icon='form'/>)}</Translate> : <span>&mdash;</span>
                    }
                </div>
                <div className="flex-col"
                     onClick={this.handleClick}>
                    <PopoverFile data={this.refactorFiles(file)}
                                 canAddFiles={status!=="completed"}
                                 id_app={this.props.id}
                                 onAddFiles = {this.props.onAddFiles}
                                 refresh={this.props.refresh}
                                 makeArchiveOfFiles = {this.props.makeArchiveOfFiles}

                    >

                    </PopoverFile>
                </div>
            </div>
        )
    }
}

HistoryReceptionsItems.propTypes = {
    id: PropTypes.string,
    status: PropTypes.string,
    type: PropTypes.string.isRequired,
    diagnostic: PropTypes.string,
    comments: PropTypes.string,
    price: PropTypes.string,
    conclusionDownload: PropTypes.string,
    review: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string
};

HistoryReceptionsItems.defaultProps = {
    id: 0,
    size: 'small',
    status: 'new',
    diagnostic: '-',
    comment: '-',
    price: '-',
    conclusion: {},
    conclusionDownload: '',
    review: '-',
    date: '-',
    time: '-',
};

export default HistoryReceptionsItems
