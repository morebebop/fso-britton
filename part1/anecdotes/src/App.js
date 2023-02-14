// imports state to be used later in the App component
import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // adds state to App component. 
  // 'selected' is used to choose which anecdote is selected. 
  const [selected, setSelected] = useState(0)
  // 'points' is used to vote and keep track of votes for each anecdote. 
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))

  // this function creates adds one vote per click to the current selected anecdote. each vote value is stored in the points array to the index that corresponds to the selected anecdote.
  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  // this function sets the selected index for the anecdotes array by assigning a random number (between 0 and the maximum number of elements in the anecdotes array) to the selected value. 
  const handleAnecdoteClick = () => {
    const num = Math.round(Math.random() * ((anecdotes.length - 1) - 0) + 0)
    setSelected(num)
  }

  // renders the main body of the app.
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleAnecdoteClick}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {/* this finds the index of the highest vote value in the points array and uses it as the index for the anecdotes array*/}
      {anecdotes[points.indexOf(Math.max(...points))]}
    </div>
  )
}

export default App