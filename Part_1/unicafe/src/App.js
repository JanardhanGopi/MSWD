import React, { useState } from 'react'

import Feedback from './components/Feedback'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const sumFeedback = good + neutral + bad;
  const average = (good - bad) / sumFeedback || 0;
  const persentageOfPositiveFeedbacks = good * 100 / sumFeedback || 0;

  return (
    <div>
      <Feedback good={good} neutral={neutral} bad={bad} 
        setGood={setGood} setNeutral={setNeutral} setBad={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad} 
        all={sumFeedback} average={average} persentageOfPositiveFeedbacks={persentageOfPositiveFeedbacks}/>
    </div>
  )
}

export default App