import express from "express"
import mongoose  from "mongoose";
import { Book } from "../models/bookModel.js";

const router=express.Router();


//save new book
router.post('/', async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;

        if (!title || !author || !publishYear) {
            return res.status(400).send({
                message: "Please send all required fields"
            });
        }

        const newBook = {
            title,
            author,
            publishYear
        };

        const book = await Book.create(newBook);
        return res.status(200).send(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Fetch all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Fetch book by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid book ID format" });
        }

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).send({ message: "Book not found" });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

//put
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = {};

        // Check which fields are present in the request body and add them to updateFields
        if (req.body.title) {
            updateFields.title = req.body.title;
        }
        if (req.body.author) {
            updateFields.author = req.body.author;
        }
        if (req.body.publishYear) {
            updateFields.publishYear = req.body.publishYear;
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).send({
                message: "No fields provided for update"
            });
        }

        // Find and update the book by ID
        const updatedBook = await Book.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({
            message: "Book updated successfully",
            data: updatedBook
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});
//delete
router.delete("/:id", async(req,res)=>{
    try{
        const {id}=req.params;
         const result= await Book.findByIdAndDelete(id);
         if(!result){
            return res.status(404).json({ message: "Book not found" });
         }
         res.status(200).json({
            message: "Book deleted successfully",
            
        });

    } catch(error){
        console.log(error.message);
        return res.status(500).send({message:error.message})
    }
})

export default router;