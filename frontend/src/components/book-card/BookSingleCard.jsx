/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import axios from "axios";
import { useSnackbar } from "notistack";

const BookSingleCard = ({ book, index, id }) => {
  const { enqueueSnackbar } = useSnackbar();
  const imgUrl = book.imageLinks
    ? book.imageLinks.thumbnail
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTULSPiQKGEcCtCxrkr4t9Ub8U-Jwzv3kXu2RMOzQoihg&s";

  const updateFavorite = () => {
    const data = {
      id: id,
      book,
    };
    axios
      .post("http://localhost:5000/books", data)
      .then((res) => {
        const { message } = res.data;
        enqueueSnackbar(message, { variant: "success" });
        console.log();
      })
      .catch((err) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(err);
      });
  };

  return (
    <div className="border-2 border-gray-500 rounded-lg px-4 py-2 m-2 relative hover:shadow-xl">
      <h4 className="mb-3 text-xl text-gray-500">{index + 1}.</h4>
      <img src={imgUrl} className="w-52" />
      <h2 className="absolute top-2 right-2 px-3 py-2 bg-red-300 rounded-lg">
        {book.publishedDate}
      </h2>
      <div className="flex justify-start items-center gap-x-2">
        <PiBookOpenTextLight className="text-red-300 text-2xl" />
        <h2 className="my-1">{book.title}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <BiUserCircle className="text-red-300 text-2xl" />
        <h2 className="my-1">{book.authors}</h2>
      </div>
      <div className="flex justify-evenly items-center gap-x-2 mt-4 p-4">
        <Link to={`/bookmodal/${id}`} target="_blank">
          <BiShow className="text-5xl text-blue-800 hover:text-black hover:scale-110 transition duration-200 ease-in-out cursor-pointer" />
        </Link>
        <MdFavoriteBorder
          className="text-5xl text-red-400 hover:text-black hover:scale-110 transition duration-200 ease-in-out cursor-pointer"
          onClick={updateFavorite}
        />
      </div>
    </div>
  );
};

export default BookSingleCard;
