import React from 'react'
import { eventLevels } from './utils/eventLevels'
import cn from 'classnames'
import Icon from '../../Icon'
import moment from 'moment'


class EventRowMonth extends React.Component {
    constructor(props){
        super(props);
        this.now = new Date();
    }

    isSegmentInSlot = (seg, slot) => seg.left <= slot && seg.right >= slot;

    prepareRow = (segments,slotCount) => {
        let rowSegments = eventLevels(segments).levels[0];
        if (!rowSegments) rowSegments = [];

        let current = 1,
            row = [],
            currentInSeg = 0;

        while (current <= slotCount) {
            let { event } =
            rowSegments.filter(seg => this.isSegmentInSlot(seg, current))[0] || {}

            if (!event) {
                row.push(null)
                current++;
                continue
            }

            let gap =0;
            for (let i =0, len = segments.length; i < len; i++){
                if(segments[i].left == current){
                    gap++;
                    continue;
                }
                if(segments[i].left > current){
                    break
                }
            }
            if (gap) {
                row.push({
                    gap: gap,
                    date: rowSegments[currentInSeg].event.start
                })
            }
            currentInSeg++;
            current++
        }

        return row;
    };
    renderRow = (row) => {

        return row.map((el, i) => {
            let cellClass;

            let div = el ? (
                    cellClass = cn(
                        'month-row-segment',
                        {'month-row-segment-coming':
                        this.now.getDate() <= el.date.getDate() &&
                        this.now.getMonth() <= el.date.getMonth() &&
                        this.now.getYear() <= el.date.getYear()}),

                        <div key={'_lvl_' + i}
                             className={cellClass}
                             style={{width: `${100 / 7}%`}}>
                            <div className="month-row-segment-content">
                                <div className="icon-count">
                                    <Icon type="user" size={28}/>
                                </div> {el.gap}
                            </div>
                        </div>
                ) :
                <div key={'_lvl_' + i}
                     className="rbc-row-segment"
                     style={{width: `${100/7}%`}}/>


            return (div)
        });
    };

    prepareEditorRow = (segments, slotCount) => {
        let rowSegments = eventLevels(segments).levels[0];
        if (!rowSegments) rowSegments = [];
        let current = 1,
            row = [],
            currentInSeg = 0;

        while (current <= slotCount) {
            let {event} =
            rowSegments.filter(seg => this.isSegmentInSlot(seg, current))[0] || [];

            if (!event) {
                row.push(null)
                current++;
                continue
            }
            row.push(event)
            currentInSeg++;
            current++
        }

        return row;
    };
    renderEditorRow = (row) => {
        return row.map((el, i) => {
            let cellClass;

            let div = el ? (
                    cellClass = cn(
                        'month-row-segment',
                    ),

                        <div key={'edit-lvl_' + i}
                             className={cellClass}
                             style={{width: `${100 / 7}%`}}>
                            {this.renderScheduleContent(el)}
                        </div>
                ) :
                <div key={'edit-lvl_' + i}
                     className="rbc-row-segment"
                     style={{width: `${100/7}%`}}/>


            return (div)
        });
    };

    renderScheduleContent = (sched) => {
        let rootCl = +(sched.isEditable) ? 'root_schedule' : 'root_schedule no-edit'

        
        return (<div className={rootCl}>
            {+(sched.isEditable)
                ? <Icon type="setting_edit" size={20} svg/>
                : <Icon type="no" size={20} svg/>}

            <div className="month-row-segment-schedule">

            {sched.intervalOb.length !== 0
            && <div className="schedule-time">
                <div className="schedule-time-item empty"></div>
                <div className="schedule-time-item">
                    {sched.intervalOb.map((time, i) => (<div key={'time'+i}>
                                        {
                                            moment(time.start).format('HH:mm')
                                        } - {
                                            moment(time.end).format('HH:mm')
                                        }
                                </div>))

                    }
                    </div>
                </div>
            }


            {sched.intervalEx.length !== 0
            && <div className="schedule-emrgtime">
                <div className="schedule-emrgtime-item with-sign">
                    <div><Icon type="emergency-call" svg size={20}/></div>
                </div>
                <div className="schedule-emrgtime-item">
                    {sched.intervalEx.map((time, i) => (<div key={'emrgtime'+i}>
                        {moment(time.start).format('HH:mm')
                        } - {
                        moment(time.end).format('HH:mm')}
                    </div>))

                    }
                </div>
            </div>
            }
        </div>
        </div>)
    }


    render() {
        let { segments, scheds, editor,slots: slotCount = 7 } = this.props;

        let row = [];

        if (!editor)
            row = this.prepareRow(segments,slotCount);
        else
            row = this.prepareEditorRow(scheds,slotCount);



        return <div className="month-row">
            {editor
                ? this.renderEditorRow(row)
                : this.renderRow(row)}
                </div>
    }

}

export default EventRowMonth
