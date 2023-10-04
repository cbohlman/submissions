const Persons = ({ peopleToShow }) => {
    return (
        <div>
            {peopleToShow.map(person => <li key={person.id}>{person.name} - {person.number}</li>)}
        </div>
    )
}

export default Persons