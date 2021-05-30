import React from 'react'

import Part from './Part'

const Content = ({parts}) => (
  <>
    {
      parts.map((p) => <Part key={p.name} part={p.name} exercises={p.exercises} />)
    }
  </>
)

export default Content;