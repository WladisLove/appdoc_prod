import PropTypes from 'prop-types'
import React, { Component } from 'react'
import cn from 'classnames'
import { findDOMNode } from 'react-dom'

import dates from './utils/dates'
import localizer from './localizer'
import DayColumn from './DayColumn'
import TimeColumn from './TimeColumn'
import Header from './Header'
import Icon from '../../Icon'
import Button from '../../Button'
import { Translate } from 'react-localize-redux'

import getWidth from 'dom-helpers/query/width'
import scrollbarSize from 'dom-helpers/util/scrollbarSize'
import message from './utils/messages'

import { accessor, dateFormat } from './utils/propTypes'

import { notify } from './utils/helpers'

import { accessor as get } from './utils/accessors'

import { inRange, sortEvents, segStyle } from './utils/eventLevels'

export default class TimeGrid extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    resources: PropTypes.array,

    step: PropTypes.number,
    range: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    now: PropTypes.instanceOf(Date),

    scrollToTime: PropTypes.instanceOf(Date),
    eventPropGetter: PropTypes.func,
    dayPropGetter: PropTypes.func,
    dayFormat: dateFormat,
    showMultiDayTimes: PropTypes.bool,
    culture: PropTypes.string,

    rtl: PropTypes.bool,
    width: PropTypes.number,

    titleAccessor: accessor.isRequired,
    allDayAccessor: accessor.isRequired,
    startAccessor: accessor.isRequired,
    endAccessor: accessor.isRequired,
    resourceAccessor: accessor.isRequired,

    resourceIdAccessor: accessor.isRequired,
    resourceTitleAccessor: accessor.isRequired,

    selected: PropTypes.object,
    selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
    longPressThreshold: PropTypes.number,

    onNavigate: PropTypes.func,
    onSelectSlot: PropTypes.func,
    onSelectEnd: PropTypes.func,
    onSelectStart: PropTypes.func,
    onSelectEvent: PropTypes.func,
    onDoubleClickEvent: PropTypes.func,
    onDrillDown: PropTypes.func,
    getDrilldownView: PropTypes.func.isRequired,

    messages: PropTypes.object,
    components: PropTypes.object.isRequired,
  }

  static defaultProps = {
    step: 30,
    min: dates.startOf(new Date(), 'day'),
    max: dates.endOf(new Date(), 'day'),
    scrollToTime: dates.startOf(new Date(), 'day'),
    /* these 2 are needed to satisfy requirements from TimeColumn required props
     * There is a strange bug in React, using ...TimeColumn.defaultProps causes weird crashes
     */
    type: 'gutter',
    now: new Date(),
  }

  constructor(props) {
    super(props)
    this.state = { gutterWidth: undefined, isOverflowing: null }
    this.handleSelectEvent = this.handleSelectEvent.bind(this)
    this.handleDoubleClickEvent = this.handleDoubleClickEvent.bind(this)
    this.handleHeaderClick = this.handleHeaderClick.bind(this)
  }

  componentWillMount() {
    this._gutters = []
    this.calculateScroll()
  }

  componentDidMount() {
    this.checkOverflow()

    /*if (this.props.width == null) {
      this.measureGutter()
    }*/
    this.applyScroll()

    //this.positionTimeIndicator()
    //this.triggerTimeIndicatorUpdate()
  }

  componentWillUnmount() {
    window.clearTimeout(this._timeIndicatorTimeout)
  }

  componentDidUpdate() {
    /*if (this.props.width == null && !this.state.gutterWidth) {
      this.measureGutter()
    }*/

    this.applyScroll()
    //this.positionTimeIndicator()
  }

  componentWillReceiveProps(nextProps) {
    const { range, scrollToTime } = this.props
    // When paginating, reset scroll
    if (
      !dates.eq(nextProps.range[0], range[0], 'minute') ||
      !dates.eq(nextProps.scrollToTime, scrollToTime, 'minute')
    ) {
      this.calculateScroll()
    }
  }

  render() {
      let {
      events,
      range,
      width,
      startAccessor,
      endAccessor,
      resources,
      allDayAccessor,
      showMultiDayTimes,
    } = this.props

    width = width || this.state.gutterWidth

    let start = range[0],
      end = range[range.length - 1]

    this.slots = range.length

    let allDayEvents = [],
      rangeEvents = []

    events.forEach(event => {
      if (inRange(event, start, end, this.props)) {
        let eStart = get(event, startAccessor),
          eEnd = get(event, endAccessor)

        if (
          get(event, allDayAccessor) ||
          (dates.isJustDate(eStart) && dates.isJustDate(eEnd)) ||
          (!showMultiDayTimes && !dates.eq(eStart, eEnd, 'day'))
        ) {
          allDayEvents.push(event)
        } else {
          rangeEvents.push(event)
        }
      }
    })

    allDayEvents.sort((a, b) => sortEvents(a, b, this.props))

    let gutterRef = ref => (this._gutters[1] = ref && findDOMNode(ref))

    let eventsRendered = this.renderEvents(
      range,
      rangeEvents,
      this.props.now,
      resources || [null]
    )
    return (
      <div className="rbc-time-view">
        {this.renderHeader(range, allDayEvents, width, resources)}

{
  this.props.intervals.length ?
  (
    <div ref="content" className="rbc-time-content">
          {/*<div ref="timeIndicator" className="rbc-current-time-indicator" />*/}

          <TimeColumn
            {...this.props}
            showLabels
            style={{ width }}
            ref={gutterRef}
            className="rbc-time-gutter"
          />
          {eventsRendered}
        </div>
  ) : (
    <div ref="content" className="calendar-empty-content">
      <div className="warning"><Translate id="schedule.notFilled" /></div>
      <div className="decision"><Translate id="schedule.goTo" />
      <Translate>
          {({ translate }) =>
              (<Button
                  btnText={translate(`schedule.editor`)}
                  size='go'
                  type='go'
                  svg
                  onClick={this.props.gotoEditor}
              />)
          }
      </Translate>.</div>
    </div>
  )
}

      </div>
    )
  }

  renderEvents(range, events, today, resources) {
    let {
      min,
      max,
      endAccessor,
      startAccessor,
      resourceAccessor,
      resourceIdAccessor,
      components,
    } = this.props

    return range.map((date, idx) => {
      let daysEvents = events.filter(event =>
        dates.inRange(
          date,
          get(event, startAccessor),
          get(event, endAccessor),
          'day'
        )
      )

      return resources.map((resource, id) => {
        let eventsToDisplay = !resource
          ? daysEvents
          : daysEvents.filter(
              event =>
                get(event, resourceAccessor) ===
                get(resource, resourceIdAccessor)
            )

        return (
          <DayColumn
            {...this.props}
            min={dates.merge(date, min)}
            max={dates.merge(date, max)}
            resource={resource && resource.id}
            eventComponent={components.event}
            eventWrapperComponent={components.eventWrapper}
            dayWrapperComponent={components.dayWrapper}
            className={cn({ 'rbc-now': dates.eq(date, today, 'day') })}
            style={segStyle(1, this.slots)}
            key={idx + '-' + id}
            date={date}
            events={eventsToDisplay}
          />
        )
      })
    })
  }

  renderHeader(range, events, width, resources) {
    let { messages, rtl, selectable, components, now } = this.props
    let { isOverflowing } = this.state || {}

    let style = {}
    if (isOverflowing)
      style[rtl ? 'marginLeft' : 'marginRight'] = scrollbarSize() + 'px'

    let headerRendered = resources
      ? this.renderHeaderResources(range, resources)
      : message(messages).allDay

    return (
      <div
        ref="headerCell"
        className={cn('rbc-time-header', isOverflowing && 'rbc-overflowing')}
        style={style}
      >
        <div className="rbc-row">
          <div className="rbc-label rbc-header-gutter rbc-clock-icon">
            <Icon type="clock" svg size={28}/>
          </div>
            {this.renderHeaderCells(range)}
        </div>
        {resources && (
          <div className="rbc-row rbc-row-resource">
            <div className="rbc-label rbc-header-gutter" style={{ width }} />
            {headerRendered}
          </div>
        )}
      </div>
    )
  }

  renderHeaderResources(range, resources) {
    const { resourceTitleAccessor } = this.props
    return range.map((date, i) => {
      return resources.map((resource, j) => {
        return (
          <div
            key={i + '-' + j}
            className={cn('rbc-header', dates.isToday(date) && 'rbc-today')}
            style={segStyle(1, this.slots)}
          >
            <span>{get(resource, resourceTitleAccessor)}</span>
          </div>
        )
      })
    })
  }

  renderHeaderCells(range) {
    let {
      dayFormat,
      culture,
      dayPropGetter,
      getDrilldownView,
    } = this.props
    let HeaderComponent = Header

    return range.map((date, i) => {
      let drilldownView = getDrilldownView(date)
        let labels = [localizer.format(date, 'dddd', culture),
            localizer.format(date, 'DD', culture)];

        const { className, style: dayStyles } =
        (dayPropGetter && dayPropGetter(date)) || {}

      let header = (
        <HeaderComponent
          date={date}
          labels={labels}
          localizer={localizer}
          format={dayFormat}
          culture={culture}
        />
      )

      return (
        <div
          key={i}
          className={cn(
            'rbc-header',
            className,
            dates.isToday(date) && 'rbc-today'
          )}
          style={Object.assign({}, dayStyles, segStyle(1, this.slots ))}
        >
            {
                drilldownView ? (
                    <span onClick={e => this.handleHeaderClick(date, drilldownView, e)}>
                        {header}
                    </span>
                    ) : (
                        <span>{header}</span>
                    )
            }

        </div>
      )
    })
  }

  handleHeaderClick(date, view, e) {
    e.preventDefault()
    notify(this.props.onDrillDown, [date, view])
  }

  handleSelectEvent(...args) {
    notify(this.props.onSelectEvent, args)
  }

  handleDoubleClickEvent(...args) {
    notify(this.props.onDoubleClickEvent, args)
  }

  /*measureGutter() {
    let width = this.state.gutterWidth
    let gutterCells = this._gutters

    if (!width) {
      width = Math.max(...gutterCells.map(getWidth))

      if (width) {
        this.setState({ gutterWidth: width })
      }
    }
  }*/

  applyScroll() {
    if (this._scrollRatio) {
      const { content } = this.refs
      content.scrollTop = content.scrollHeight * this._scrollRatio
      // Only do this once
      this._scrollRatio = null
    }
  }

  calculateScroll() {
    const { min, max, scrollToTime } = this.props

    const diffMillis = scrollToTime - dates.startOf(scrollToTime, 'day')
    const totalMillis = dates.diff(max, min)

    this._scrollRatio = diffMillis / totalMillis
  }

  checkOverflow() {
    if (this._updatingOverflow) return

    let isOverflowing =
      this.refs.content.scrollHeight > this.refs.content.clientHeight

    if (this.state.isOverflowing !== isOverflowing) {
      this._updatingOverflow = true
      this.setState({ isOverflowing }, () => {
        this._updatingOverflow = false
      })
    }
  }

  /*positionTimeIndicator() {
    const { rtl, min, max } = this.props
    const now = new Date()

    const secondsGrid = dates.diff(max, min, 'seconds')
    const secondsPassed = dates.diff(now, min, 'seconds')

    const timeIndicator = this.refs.timeIndicator
    const factor = secondsPassed / secondsGrid
    const timeGutter = this._gutters[this._gutters.length - 1]

    if (timeGutter && now >= min && now <= max) {
      const pixelHeight = timeGutter.offsetHeight
      const offset = Math.floor(factor * pixelHeight)

      timeIndicator.style.display = 'block'
      timeIndicator.style[rtl ? 'left' : 'right'] = 0
      timeIndicator.style[rtl ? 'right' : 'left'] =
        timeGutter.offsetWidth + 'px'
      timeIndicator.style.top = offset + 'px'
    } else {
      timeIndicator.style.display = 'none'
    }
  }*/

  /*triggerTimeIndicatorUpdate() {
    // Update the position of the time indicator every minute
    this._timeIndicatorTimeout = window.setTimeout(() => {
      this.positionTimeIndicator()

      this.triggerTimeIndicatorUpdate()
    }, 60000)
  }*/
}
