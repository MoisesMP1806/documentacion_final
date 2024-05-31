import express from "express";
import Book from "../models/Book.js";
import BookCategory from "../models/BookCategory.js";

const router = express.Router();

/**
 * @class Books
 * @description Clase que maneja las rutas de operaciones relacionadas con los libros.
 */

/**
 * Obtiene todos los libros en la base de datos.
 * @function getAllBooks
 * @memberof Books
 * @route GET /api/books/allbooks
 * @group Books - Operaciones relacionadas con libros
 * @returns {Object} Objeto JSON que contiene todos los libros.
 */
router.get("/allbooks", async (req, res) => {
    try {
        const books = await Book.find({}).populate("transactions").sort({ _id: -1 });
        res.status(200).json(books);
    } catch (err) {
        res.status(504).json(err);
    }
});

/**
 * Obtiene un libro por su ID.
 * @function getBookById
 * @memberof Books
 * @route GET /api/books/getbook/:id
 * @group Books - Operaciones relacionadas con libros
 * @param {Object} req.params - Parámetros de la solicitud HTTP.
 * @property {string} req.params.id - El ID del libro.
 * @returns {Object} Objeto JSON que representa el libro.
 */
router.get("/getbook/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("transactions");
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * Obtiene libros por nombre de categoría.
 * @function getBooksByCategory
 * @memberof Books
 * @route GET /api/books
 * @group Books - Operaciones relacionadas con libros
 * @param {Object} req.query - Consulta de la solicitud HTTP.
 * @property {string} req.query.category - El nombre de la categoría.
 * @returns {Object} Objeto JSON que contiene los libros de la categoría.
 */
router.get("/", async (req, res) => {
    const category = req.query.category;
    try {
        const books = await BookCategory.findOne({ categoryName: category }).populate("books");
        res.status(200).json(books);
    } catch (err) {
        res.status(504).json(err);
    }
});

/**
 * Añade un nuevo libro.
 * @function addBook
 * @memberof Books
 * @route POST /api/books/addbook
 * @group Books - Operaciones relacionadas con libros
 * @param {Object} req.body - Cuerpo de la solicitud HTTP.
 * @property {boolean} req.body.isAdmin - Indica si el usuario es un administrador.
 * @property {string} req.body.bookName - El nombre del libro.
 * @property {string} [req.body.alternateTitle] - Un título alternativo para el libro.
 * @property {string} req.body.author - El autor del libro.
 * @property {number} req.body.bookCountAvailable - El número de copias disponibles del libro.
 * @property {string} [req.body.language] - El idioma en el que está escrito el libro.
 * @property {string} [req.body.publisher] - La editorial del libro.
 * @property {string} [req.body.bookStatus] - El estado del libro.
 * @property {mongoose.Types.ObjectId[]} req.body.categories - Las categorías a las que pertenece el libro.
 * @returns {Object} Objeto JSON que representa el libro añadido.
 */
router.post("/addbook", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const newbook = await new Book({
                bookName: req.body.bookName,
                alternateTitle: req.body.alternateTitle,
                author: req.body.author,
                bookCountAvailable: req.body.bookCountAvailable,
                language: req.body.language,
                publisher: req.body.publisher,
                bookStatus: req.body.bookStatus,
                categories: req.body.categories
            });
            const book = await newbook.save();
            await BookCategory.updateMany({ '_id': book.categories }, { $push: { books: book._id } });
            res.status(200).json(book);
        } catch (err) {
            res.status(504).json(err);
        }
    } else {
        res.status(403).json("You don't have permission to add a book!");
    }
});

/**
 * Actualiza un libro por su ID.
 * @function updateBook
 * @memberof Books
 * @route PUT /api/books/updatebook/:id
 * @group Books - Operaciones relacionadas con libros
 * @param {Object} req.body - Cuerpo de la solicitud HTTP.
 * @property {boolean} req.body.isAdmin - Indica si el usuario es un administrador.
 * @property {string} req.params.id - El ID del libro a actualizar.
 * @returns {string} Mensaje que indica que los detalles del libro se actualizaron correctamente.
 */
router.put("/updatebook/:id", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            await Book.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Book details updated successfully");
        } catch (err) {
            res.status(504).json(err);
        }
    } else {
        res.status(403).json("You don't have permission to update a book!");
    }
});

/**
 * Elimina un libro por su ID.
 * @function removeBook
 * @memberof Books
 * @route DELETE /api/books/removebook/:id
 * @group Books - Operaciones relacionadas con libros
 * @param {Object} req.body - Cuerpo de la solicitud HTTP.
 * @property {boolean} req.body.isAdmin - Indica si el usuario es un administrador.
 * @property {string} req.params.id - El ID del libro a eliminar.
 * @returns {string} Mensaje que indica que el libro se eliminó correctamente.
 */
router.delete("/removebook/:id", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const _id = req.params.id;
            const book = await Book.findOne({ _id });
            await book.remove();
            await BookCategory.updateMany({ '_id': book.categories }, { $pull: { books: book._id } });
            res.status(200).json("Book has been deleted");
        } catch (err) {
            res.status(504).json(err);
        }
    } else {
        res.status(403).json("You don't have permission to delete a book!");
    }
});

export default router;