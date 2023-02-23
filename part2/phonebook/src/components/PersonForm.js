const PersonForm = ({addName, newName, newNumber, handleNumberChange, handleNameChange}) => {

    return (
      <form onSubmit={addName}>
      <div>
        name: 
        <input value={newName} onChange={handleNameChange} />
        <br />
        number: 
        <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
}
export default PersonForm