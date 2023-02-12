import { useState } from 'react'

const Button = (props) => {
  return (
      <button onClick={() => props.setValue(props.value + 1)}>{props.text}</button>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

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
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
        <StatisticsLine text='good' value={g.value}/>
        <StatisticsLine text='neutral' value={n.value}/>
        <StatisticsLine text='bad' value={b.value}/>
        <StatisticsLine text='average' value={(((g.value * 1) + (n.value * 0) +( b.value * -1))/(g.value + n.value + b.value)).toFixed(2)}/>
        <StatisticsLine text='positive' value={((g.value / (g.value + n.value + b.value))*100).toFixed(1) + '%'} />
        </tbody>
      </table>
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
        <Button text='good' value={good} setValue={setGood}/>
        <Button text='neutral' value={neutral} setValue={setNeutral}/>
        <Button text='bad' value={bad} setValue={setBad}/>
      <h1>statistics</h1>
        <Statistics text={['good', 'neutral', 'bad']} value= {[good, neutral, bad]} />
    </div>
  )
}

export default App