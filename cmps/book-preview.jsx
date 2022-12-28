
export function BookPreview({ book }) {

    return <article className="book-preview">
        <h2>{book.title} </h2>
        <h3>{book.listPrice.amount + book.listPrice.currencyCode}</h3>
        <img src={book.thumbnail} />
    </article>
}