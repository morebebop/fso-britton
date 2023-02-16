// the Header component displays the name for each course in an h2 
const Header = ({courseName}) => {
  return (
    <h2 key={courseName.id}>{courseName}</h2>
  )
}

// the Part component uses the map function to loop through each index in the parts array to display the part name and exercise in a p element
const Part = ({parts}) => {
  return (
    parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
  )
}

// the Total component uses the reduce function to loop through each part's exercise count and add them to a sum value (starting at 0)
// this value is assigned to the Total const and displayed in a p element
const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p><b>total of {total} exercises</b></p>
  )
}

// the Content component passes the parts array to both Part and Total components to display each part and its total sum in a single div
const Content =({parts}) => {
  return (
    <div>
      <Part parts={parts} />
      <Total parts={parts} />
    </div>
  )
  
}

// the Course component uses the destructured courses object to pass it along to the Header and Content component directly. 
const Course = ({courses}) => {
  return (
    <div>
      {/* map is used to loop over each course in the courses object. It displays te course name and its parts in a separate div */}
      {courses.map(course =>
        <div key={course.id}>
          {/* the Header component accesses the name for each course */}
          <Header courseName={course.name} />
          {/* the Content component accesses the part array in each course */}
          <Content parts={course.parts}/>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <h1>Web development curriculum</h1>
      {/* the Course component is called with the courses object as an argument */}
      <Course courses={courses} />
    </div>
  )
}

export default App