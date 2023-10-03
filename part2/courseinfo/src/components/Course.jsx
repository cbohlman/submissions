const Header = ({ course }) => <h1>{course}</h1>

// Adding comment to cover part 2.2
const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Course = ({ course }) => {
  const sum = course.parts.reduce((p,n) => p + n.exercises, 0);

  return (
  <>
    <Header course={course.name} />
    {course.parts.map(x => <Part key={x.id} part={x}/>)}
    <Total sum={sum} />
  </>
  )
}

export default Course