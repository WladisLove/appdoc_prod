import PropTypes from 'prop-types'
import React from 'react'
import EventRowMixin from './EventRowMixin'
import { eventLevels } from './utils/eventLevels'
import cn from 'classnames'
import Icon from '../../Icon'

let isSegmentInSlot = (seg, slot) => seg.left <= slot && seg.right >= slot
let eventsFilter = (segments, slot) =>{
    let filtered = segments.filter(seg => isSegmentInSlot(seg, slot))

    let count = filtered.length;
    let date = filtered ? filtered[0].event.start : null;

    return {count,date};
}

class EventEndingRow extends React.Component {
  static propTypes = {
    segments: PropTypes.array,
    slots: PropTypes.number,
    onShowMore: PropTypes.func,
    ...EventRowMixin.propTypes,
  }
  static defaultProps = {
    ...EventRowMixin.defaultProps,
  }

  render() {
    let { segments, slots: slotCount } = this.props
    let rowSegments = eventLevels(segments).levels[0]
      if (!rowSegments) rowSegments = [];

    let current = 1,
      lastEnd = 1,
      row = []

    while (current <= slotCount) {
      let key = '_lvl_' + current

      let { event, left, right, span } =
        rowSegments.filter(seg => isSegmentInSlot(seg, current))[0] || {} //eslint-disable-line

      if (!event) {
        current++
        continue
      }

      let gap = Math.max(0, left - lastEnd)

        if (gap) {
          row.push(EventRowMixin.renderSpan(this.props, gap, key + '_gap'))
        }

        row.push(
          EventRowMixin.renderSpan(
            this.props,
            1,
            key,
            this.renderShowMore(segments, current)
          )
        )
        lastEnd = current = current + 1
    }

    return <div className="rbc-row">{row}</div>
  }

  renderShowMore(segments, slot) {

      let {count,date} = eventsFilter(segments,slot);
      let cellClass = cn('rbc-month-receptionNum',
          {'rbc-month-receptionNum-coming': this.props.now.setHours(0,0,0,0) <= date.setHours(0,0,0,0)})

    return count && (
      <div
        key={'sm_' + slot}
        className={cellClass}
        onClick={e => this.showMore(slot, e)}
      >
        <div className="icon-count">
          <Icon type="user" size={28}/>
        </div> {count}
      </div>
    )
  }

  showMore(slot, e) {
    e.preventDefault()
    this.props.onShowMore(slot)
  }
}

export default EventEndingRow
