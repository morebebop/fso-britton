const PersonsList = ({persons, search, removeName}) => {
    return (
        <div>
            {/* if the search field is empty, then the persons array is display. Otherwise, the search results are displayed */}
            {search.search === '' 
                ? persons.map(person => 
                        <p key={person.name}>{person.name} {person.number} {removeName(person.id)}</p>)
                : search.list.map(s => 
                        <p key={s.name}>{s.name} {s.number} {removeName(s.id)}</p>)
            }
        </div>
    )
}

export default PersonsList