import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'
import ScrollArea from 'react-scrollbar'
import PatientHistoryReceptionsItem from '../PatientHistoryReceptionsItem'
import Card from '../Card'
import Button from '../Button'
import DatePicker from '../DatePicker'
import Icon from '../Icon'
import { Translate } from 'react-localize-redux'

import './style.css'
import '../../icon/style.css'

class PatientHistoryReceptions extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            range: [],
            limit: this.props.limit,
            limitedShow: true,
            periodReceptions: [],
            topicalReceptions: [],
            completedReceptions: [],
            upcomingReceptions: [],
            currentTab: 'all'
        };
    }

    // отзывы должны быть размещены в соответствии с: чем меньше id, тем раньше он был опубликован

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.length !== this.props.data.length) {
            this.setState(prev => ({
                range: [],
                periodReceptions: [],
                limitedShow: true,
            }));
            this.sortHistoryReceptions();
        }
    }
    renderShowMoreBtn = (revArr) => {
        if (this.state.limit < revArr.length && this.state.limitedShow) {
            return (
                <div className="table-footer" key="btn">
                    <Translate>
                        {({ translate }) =>
                            (<Button btnText='Показать еще'
                                    size='link'
                                    type='link'
                                    title={translate('button.title.showMore')}
                                    icon='circle_arrow_down'
                                    onClick={() => this.setState(prev => ({limitedShow: false}))}/>)
                        }
                    </Translate>
                </div>)
        }
    };

    historyRender = (dataArr) => {
        let historyArr = [];
        const arr = (this.state.periodReceptions.length || this.state.range.length)
            ? this.state.periodReceptions : dataArr;
        arr.map((item, i) => {
            if (this.state.limit > i || !this.state.limitedShow) {
                historyArr.push(<PatientHistoryReceptionsItem {...item} key={'histRecept' + i}/>)
            }
        });
        historyArr.push(this.renderShowMoreBtn(arr));
        return historyArr;
    };

    render(){
        const rootClass = cn('patient-receptions-all');

        return (<div>
            <Translate>
                {({ translate }) =>
                    (<div className={rootClass}>
                        <Card title={translate('reception.history')}>
                            <ScrollArea
                                    speed={1}
                                    className="scroll"
                                    contentClassName="content"
                            >
                                <div className="tableheader">
                                    <div className="flex-col"><div className="patient-receptions-status new">{translate('filter.new')}</div></div>
                                    <div className="flex-col"><div className="patient-receptions-status topical">{translate('filter.topical')}</div></div>
                                    <div className="flex-col"><div className="patient-receptions-status completed">{translate('filter.completed')}</div></div>
                                    <div className="flex-col"><div className="patient-receptions-status extra">{translate('filter.emergencies')}</div></div>
                                </div>
                                <div className="tableheader menu-header">
                                    <div className="flex-col"><div className="tableheader-name">{translate('reception.date')}</div></div>
                                    <div className="flex-col"><div className="tableheader-name">{translate('diagnosis')}</div></div>
                                    <div className="flex-col"><div className="tableheader-name">{translate('reception.comment')}</div></div>
                                    <div className="flex-col"><div className="tableheader-name">{translate('cost')}</div></div>
                                    <div className="flex-col"><div className="tableheader-name">{translate('conclusion.single')}</div></div>
                                    <div className="flex-col"><div className="tableheader-name">{translate('review.single')}</div></div>
                                    <div className="flex-col"><div className="tableheader-name"></div></div>
                                </div>
                                {this.historyRender(this.props.data)}
                            </ScrollArea>
                          </Card>
                    </div>)
                }
            </Translate>
        </div>)
    }
}

PatientHistoryReceptions.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    limit: PropTypes.number,
};

PatientHistoryReceptions.defaultProps = {
    data: [],
    limit: 7,
};

export default PatientHistoryReceptions
