const Filter = ({search, handleSearchChange}) => {
    // event handler for the search field.
    return (
        <div>
            filter shown with <input value={search.search} onChange={handleSearchChange} type='search'/>
        </div>
    )
}
export default Filter