import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ content }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {content}
    </div>
  )
}

Notification.propTypes = {
  content: PropTypes.string.isRequired
}

export default Notification
