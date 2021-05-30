import React from 'react'

import Statistic from './Statistic'

const Statistics = ({good, neutral, bad, all, average, persentageOfPositiveFeedbacks}) => {
  return (
    
      <div>
        <h2>statistics</h2>
        {
        all ? (
          <table>
            <tbody>
              <Statistic text={'good'} val={good} />
              <Statistic text={'neutral'} val={neutral} />
              <Statistic text={'bad'} val={bad} />
              <Statistic text={'all'} val={all} />
              <Statistic text={'average'} val={average} />
              <Statistic text={'positive'} val={persentageOfPositiveFeedbacks} persent={true}/>
            </tbody>
          </table>
          ) : 
          (
            <div>No feedback given</div>
          )
        }
      </div>
  )
}

export default Statistics;