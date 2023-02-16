const Header = ({course}) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

// the Content component uses the map function to create a return a p element with 
// name and exercise for each course part
const Content =({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      <p><b>total of {total} exercises</b></p>
    </div>
  )

}

const Course = ({course}) => {
  return (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <Course course={course} />
  )
}

export default App