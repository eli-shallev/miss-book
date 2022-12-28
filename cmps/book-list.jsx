const { Link } = ReactRouterDOM

import { BookPreview } from "./book-preview.jsx"

export function BookList({ books, onRemoveBook }) {
    return <ul className="book-list clean-list container">
        {
            books.map(book => {
                return <li key={book.id}>
                    <BookPreview book={book} />
                    <Link to={`/book/${book.id}`}>Select</Link>
                    <button className="btn-remove" onClick ={()=> onRemoveBook(book.id)}>Remove</button>
                </li>
            })
        }
    </ul>
}
