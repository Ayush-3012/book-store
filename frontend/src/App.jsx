import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import BookModal from "./components/BookModal";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mybooks" element={<Home />} />
      <Route path="/bookmodal/:bookId" element={<BookModal />} />
    </Routes>
  );
};

export default App;
