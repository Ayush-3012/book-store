import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BookCard from "./book-card/BookCard.jsx";
import Spinner from "./spinner.jsx";

const API = import.meta.env.VITE_API_URL;
const KEY = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("home");
  const [query, setQuery] = useState("");

  useEffect(() => {
    updateDb();
  }, []);

  const updateDb = () => {
    axios
      .get("http://localhost:5000/books")
      .then((res) => {
        setMyBooks(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchBooks = () => {
    setLoading(true);
    axios
      .get(API + `${query}` + KEY)
      .then((res) => {
        setBooks(res.data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    setQuery("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <div className="p-4">
      <div className="flex justify-center items-center flex-col gap-4 p-2">
        <h1 className="font-mono text-5xl font-bold text-slate-400 py-1 px-2 tracking-tight">
          <span className="text-blue-500">BOOK</span>-
          <span className="text-red-300">STORE</span>
        </h1>
        <div className="flex justify-center items-center gap-x-3 px-2 py-1">
          <Link
            to="/"
            className="bg-sky-300 hover:bg-sky-600 hover:text-white hover:scale-110 transition ease-in-out duration-300 px-4 py-1 rounded-lg text-xl"
            onClick={() => setShowType("home")}
          >
            Home
          </Link>
          <Link
            to="/mybooks"
            className="bg-red-300 hover:bg-pink-500 hover:text-white hover:scale-110 transition ease-in-out duration-300 px-4 py-1 rounded-lg text-xl"
            onClick={() => setShowType("mybooks")}
          >
            My Books
          </Link>
        </div>
        <form
          className={`flex flex-col gap-2 items-center ${
            showType !== "home" ? "hidden" : ""
          }`}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search For Books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-slate-300 focus:shadow-md focus:shadow-slate-600 w-72 rounded-lg outline-none px-3 py-2"
          />
          <button
            type="submt"
            className="border w-fit px-5 py-1 bg-blue-400 hover:bg-red-400 hover:scale-110 transition ease-in-out duration-300  hover:text-white rounded-md"
          >
            Search
          </button>
        </form>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "home" ? (
        (updateDb(), (<BookCard books={books} />))
      ) : (
        (updateDb(), (<BookCard books={myBooks} />))
      )}
    </div>
  );
};

export default Home;
