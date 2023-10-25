{
  /* eslint-disable react/prop-types */
}
import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 py-1 gap-2">
      {books.map((item, index) => (
        <BookSingleCard
          key={index}
          id={item.id}
          book={item.volumeInfo}
          index={index}
        />
      ))}
    </div>
  );
};

export default BooksCard;
