import Filter from './Filter'
const Persons = ({persons, search}) => {
    return (
        <div>
            {/* if the search field is empty, then the persons array is display. Otherwise, the search results are displayed */}
            {search.search === '' ? persons.map(person => <p key={person.name}>{person.name} {person.number}</p>) 
                                : search.list.map(s => <p key={s.name}>{s.name} {s.number}</p>)}
        </div>
    )
}

export default Persons