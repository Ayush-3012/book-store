{
  /* eslint-disable  */
}
import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./spinner.jsx";

const BookModal = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      .then((res) => {
        setBook(res.data.volumeInfo);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [bookId]);

  return (
    <div className="p-4">
      {loading ? <Spinner /> : ""}
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex flex-col border-2 border-red-400 rounded-xl h-fit w-[80%] max-w-full p-4 mx-auto relative"
      >
        <div className="flex justify-evenly p-3 max-sm:flex-col">
          <div className="px-4 py-2">
            {book.imageLinks ? (
              <img src={book.imageLinks.smallThumbnail} className="w-64" />
            ) : (
              <img src="/public/Image_not_available.png" className="w-80" />
            )}
          </div>
          <div className=" flex items-center justify-center px-8 py-2 flex-col gap-5">
            <h2 className="px-4 py-1 bg-red-300 rounded-lg text-xl h-fit flex items-center justify-center ">
              {book.publishedDate}
            </h2>
            <div className="flex justify-start items-center gap-x-2">
              <PiBookOpenTextLight className="text-red-300 text-4xl" />
              <h2 className="my-1 text-2xl font-mono">{book.title}</h2>
            </div>
            <div className="flex justify-start items-center gap-x-2">
              <BiUserCircle className="text-red-300 text-4xl" />
              <h2 className="my-1 text-xl font-mono">{book.authors}</h2>
            </div>
          </div>
        </div>
        <hr />
        <p
          className="my-2 font-mono text-lg"
          dangerouslySetInnerHTML={{ __html: book.description }}
        />
      </div>
    </div>
  );
};

export default BookModal;
