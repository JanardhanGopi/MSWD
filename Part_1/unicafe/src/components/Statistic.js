import React from 'react'

const Statistic = ({text, val, persent}) => <tr><td>{text}</td><td>{val} {persent ? '%' : ''}</td></tr>

export default Statistic;