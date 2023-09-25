import { useState } from 'react'


const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = ({text, value, isPercent}) => {
  const percentText = isPercent ? '%' : '';
  return (
    <p>{text}: {value}{percentText}</p>
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
        <StatisticLine text='Good' value={good} />
        <StatisticLine text='Neutral' value={neutral} />
        <StatisticLine text='Bad' value={bad} />
        <StatisticLine text='All' value={count} />
        <StatisticLine text='Average' value={avg} />
        <StatisticLine text='Positive' value={positive} isPercent={true} />
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