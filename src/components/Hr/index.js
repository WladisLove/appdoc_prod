import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

const Hr = (props) => {

    let style = {
        margin: `${props.offset}px 0`,
    }

    return (
        <div className="hr" style={style}>

        </div>
    )
}

Hr.propTypes = {
    offset: PropTypes.number,
}

Hr.defaultProps = {
    offset: 30,
}

export default Hr;