const Persons = ({ peopleToShow, deleteHandler }) => {
    return (
        <div>
            {peopleToShow.map(person => 
            <li key={person.id}>
                {person.name} - {person.number}
                <button onClick={() => deleteHandler(person.id)}>Delete</button>
            </li>)}
        </div>
    )
}

export default Persons