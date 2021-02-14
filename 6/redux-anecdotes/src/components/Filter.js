import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import PropTypes from 'prop-types'

const Filter = (props) => {
  const handleChange = (event) => {
    props.setFilter(event.target.value.toLowerCase())
  }
  return (
    <div>
      filter: <input name='filterInput' onChange={handleChange}></input>
    </div>
  )
}

Filter.propTypes = {
  setFilter: PropTypes.func.isRequired
}

const ConnectedFilter = connect(null, { setFilter })(Filter)
export default ConnectedFilter
