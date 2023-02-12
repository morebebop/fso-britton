import { useState } from 'react'

const Statistics = (props) => {
  const g = {
    text: props.text[0],
    value: props.value[0]
  }  
  const n = {
    text: props.text[1],
    value: props.value[1]
  }  
  const b = {
    text: props.text[2],
    value: props.value[2]
  }

  if (g.value === 0 && n.value === 0 && b.value === 0) {
    return (
      <div>
        <h1>statistics </h1>
        <p>No feedback given</p>
      </div>
    )
  }
  
  return (
    <div>
      <h1>statistics</h1>
      <p>{g.text} {g.value}</p>
      <p>{n.text} {n.value}</p>
      <p>{b.text} {b.value}</p>
      <p> average {((g.value * 1) + (n.value * 0) +( b.value * -1))/(g.value + n.value + b.value)} </p>
      <p>positive percentage {(g.value / (g.value + n.value + b.value))*100}</p>
    </div>
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

      <Statistics text={['good', 'neutral', 'bad']} value= {[good, neutral, bad]} />

    </div>
  )
}

export default App