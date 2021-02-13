import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const content = useSelector(state => state.notification)
  const style = {
    // hidden from view if no content to display
    display: content === null ? 'none' : '',
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

export default Notification
