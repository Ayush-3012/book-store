import express from "express";
import { Book } from "../model/bookModel.js";

const bookRouter = express.Router();

// ROUTE FOR GETTING ALL BOOKS
bookRouter.get("/", async (req, res) => {
  Book.find()
    .then((books) =>
      res.status(200).json({
        data: books,
      })
    )
    .catch((err) => res.status(400).json("Error" + err));
});

// ROUTE TO ADD BOOK TO FAVORITE
bookRouter.post("/", (req, res) => {
  Book.findOne({ id: req.body.id }).then((found) => {
    if (!found) {
      const newBook = {
        id: req.body.id,
        volumeInfo: req.body.book,
      };
      Book.create(newBook)
        .then(() => {
          res.status(201).json({message: "Book Added Successfully"});
        })
        .catch((error) => {
          console.log(error.message);
          res.status(500).send({ message: error.message });
        });
    } else {
      Book.deleteOne({ id: req.body.id })
        .then(() =>
          res.status(200).json({ message: "Book Removed Successfully" })
        )
        .catch(() => res.status(400).json({ message: "Book Not Found" }));
    }
  });
});

export default bookRouter;
