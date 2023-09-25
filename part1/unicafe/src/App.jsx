import { useState } from 'react'


const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let count = good + neutral + bad;
  let total = good - bad;
  let avg = total/count;
  let positive = (good/count)*100

  if (count > 0) {
    return(
      <div>
        <h1>statistics</h1>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>all: {count}</p>
        <p>average: {avg}</p>
        <p>positive: {positive}%</p>
      </div>
    )
  }
  return(
    <div>
      <p>No feedback given</p>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    console.log('Increasing Good');
    setGood(good + 1);
  }

  const increaseNeutral = () => {
    console.log('Increasing Neutral');
    setNeutral(neutral + 1);
  }

  const increaseBad = () => {
    console.log('Increase Bad');
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text='Good'/>
      <Button handleClick={increaseNeutral} text='Neutral'/>
      <Button handleClick={increaseBad} text='Bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App