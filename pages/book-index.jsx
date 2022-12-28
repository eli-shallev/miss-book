const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import { BookList } from "../cmps/book-list.jsx"
import { BookFilter } from '../cmps/book-filter.jsx'

export function BookIndex() {

    const [books, SetBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(booksToUpdate => { SetBooks(booksToUpdate) })
    }

    function onSetFilter(newFilterby) {
        setFilterBy(newFilterby)
    }

    function onRemoveBook(bookId) {
        bookService.removeBook(bookId).then(() => {
            const updateBooks = books.filter(book => book.id !== bookId)
            SetBooks(updateBooks)
            showSuccessMsg('Car removed')
        })
            .catch((err) => {
                showErrorMsg('Could not remove car, try again please!')
            })
    }

    return <section className="book-index main-layout">
        <BookFilter onSetFilter={onSetFilter} />
        <Link to={'/book/edit'}>Add new book</Link>
        <h2>My book Index</h2>
        <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
}