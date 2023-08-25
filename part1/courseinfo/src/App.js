const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  const Header = (props) => {
    return <h1>{props.course}</h1>;
  };

  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    );
  };

  const Content = (props) => {
    const part1 = props.parts[0].name;
    const part2 = props.parts[1].name;
    const part3 = props.parts[2].name;
    const exercises1 = props.parts[0].exercises;
    const exercises2 = props.parts[1].exercises;
    const exercises3 = props.parts[2].exercises;
    return (
      <>
        <Part part={part1} exercises={exercises1} />
        <Part part={part2} exercises={exercises2} />
        <Part part={part3} exercises={exercises3} />
      </>
    );
  };

  const Total = (props) => {
    return (
      <p>
        Number of exercise:{" "}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    );
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
