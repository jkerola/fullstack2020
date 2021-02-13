import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }
  return (
    <div>
      filter: <input name='filterInput' onChange={handleChange}></input>
    </div>
  )
}

export default Filter
