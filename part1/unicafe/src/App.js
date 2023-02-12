import { useState } from 'react'

const Statistics = (props) => {
  return (
    <p>{props.feedback} {props.amount}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>

      <h1>statistics</h1>
      <Statistics feedback='good' amount={good}/>
      <Statistics feedback='neutral' amount={neutral}/>
      <Statistics feedback='bad' amount={bad}/>
      <Statistics feedback='average' amount={((good * 1) + (neutral * 0) +( bad * -1))/(good + neutral + bad)} />
      <Statistics feedback='average' amount={(good / (good + neutral + bad))*100} />
    </div>
  )
}

export default App