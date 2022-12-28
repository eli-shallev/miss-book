const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'

export function BookFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(bookService.getDefaultFilter())
    
    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === "number"? +value : value
        setFilterByToEdit(prevFilter =>{
            return {...prevFilter, [field]: value}
        })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="book-filter full">
        <h2>Book Filtering</h2>
        <form onSubmit={onSubmitFilter}>
            <label htmlFor="title">By title:</label>
            <input type="text"
                id='title'
                name='title'
                value={filterByToEdit.title}
                onChange={handleChange}
                placeholder='Search by title' />
            <label htmlFor="price">By Price:</label>
            <input type="number"
                id='price'
                name='price'
                value={filterByToEdit.price}
                onChange={handleChange}
                placeholder='Search by price' />
        </form>
    </section>
}