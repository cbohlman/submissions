const PersonForm = ({ submitHandler, nameValue, nameChangeHandler, numberValue, numberChangeHandler }) => {
    return (
        <form onSubmit={submitHandler}>
        <div>
          name: <input value={nameValue} onChange={nameChangeHandler}/>
        </div>
        <div>
          number: <input value={numberValue} onChange={numberChangeHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm