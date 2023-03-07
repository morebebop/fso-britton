// takes values from input field and sets query state to the input value
const Filter = ({query, handleQuery}) => {
    return(
      <div>
        find countries <input type='search' query={query} onChange={handleQuery}/>
      </div>
    )
  }

  export default Filter