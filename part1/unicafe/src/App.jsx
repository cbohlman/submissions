import { useState } from 'react'

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

  const Button = (props) => {
    return (
      <button onClick={props.handleClick}>
        {props.text}
      </button>
    )
  }

  const Display = (props) => {
    return(
      <div>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
      </div>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text='Good'/>
      <Button handleClick={increaseNeutral} text='Neutral'/>
      <Button handleClick={increaseBad} text='Bad'/>
      <h1>statistics</h1>
      <Display/>
    </div>
  )
}

export default App