import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = ({filterChange}) => {
  const handleChange = (e) => {
    const filter = e.target.value
    filterChange(filter)
  }
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, {filterChange})(Filter)