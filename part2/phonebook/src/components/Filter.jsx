const Filter = ({ filterChangeHandler}) => {
    return (
        <div>
            filter: <input onChange={filterChangeHandler}/>
        </div>
    )
}

export default Filter