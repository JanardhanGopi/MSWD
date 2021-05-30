import React from 'react'

const Filter = ({filterStr, filterData}) => {
  return (
    <div>
      filter shown with 
      <input value={filterStr} onChange={filterData} type="text"/> 
    </div>
  )
}

export default Filter