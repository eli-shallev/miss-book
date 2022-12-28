const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import { LongTxt } from "../cmps/long-txt.jsx"
import { AddReview } from '../cmps/add-review.jsx'

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.getBook(params.bookId)
            .then(book => setBook(book))
            .catch(err => onGoBack)
    }

    function onGoBack() {
        navigate('/book')
    }

    function setReadingStyle() {
        if (book.pageCount > 500) return 'Serious Reading'
        if (book.pageCount > 200) return 'Descent Reading'
        if (book.pageCount < 100) return 'Light Reading'
        return ''
    }

    function setBookStyle() {
        const diff = (new Date(Date.now())).getFullYear() - book.publishedDate
        if (diff >= 10) return 'Vintage'
        if (diff <= 1) return 'New'
        return ''
    }

    function setBookAffordability() {
        if (book.listPrice.amount > 150) return 'expensive'
        if (book.listPrice.amount < 20) return 'cheap'
        return ''
    }

    function addReview(review) {
        bookService.addReview(book.id, review).then(book => {
            setBook(book)
            showSuccessMsg('Review added')
        })

    }

    function onRemoveReview(reviewId){
        bookService.removeReview(book.id,reviewId).then(book => {
            setBook(book)
            showSuccessMsg('Review removed')
        })
    }

    if (!book) return <div>Loading...</div>
    return <section className="book-details">
        <h2>{book.title}</h2>
        <h3>{book.subtitle}</h3>
        {book.authors.map((author, idx) =>
            <h4 key={idx}>{author}</h4>)}
        <h5>{book.publishedDate + ' ' + setBookStyle()}</h5>
        <h5>language: {book.language}</h5>
        <h5>{book.pageCount} Pages {setReadingStyle()}</h5>
        <ul>
            {book.categories.map((categorie, idx) =>
                <li key={idx}>{categorie}</li>)}
        </ul>
        <img src={book.thumbnail} />
        <h5 className={`price ${setBookAffordability()}`}>{book.listPrice.amount + book.listPrice.currencyCode}</h5>
        <LongTxt txt={book.description} />
        {book.isOnSale && <h5>On Sale!</h5>}
        <h2>Reviews</h2>
        {book.reviews && <ul>
            {book.reviews.map(review => {
                return <li key={review.id}>rating: {review.rating}/5, by: {review.fullName}, read at: {review.readAt} <button onClick={() => onRemoveReview(review.id)}>X</button></li>
            })}
        </ul>}
        {!book.reviews && <h3>No reviews yet..</h3>}


        <AddReview addReview={addReview} />

        <Link to={`/book/edit/${book.id}`}>Edit book</Link>
        <button className="btn-return" onClick={onGoBack}>Go Back</button>
    </section>
}