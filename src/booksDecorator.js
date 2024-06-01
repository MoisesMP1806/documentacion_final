import express from "express";
import Book from "../models/Book.js";
import BookTransaction from "../models/BookTransaction.js";

const router = express.Router();

/**
 * @class booksDecorator
 * @description la implementacion del patron decorator permite añadir funcionalidades a un objeto de manera dinámica. En este código, la funcionalidad de autorización isAdmin que actúa como un decorador para las rutas que requieren permisos de administrador.
 */

/**
 * 
 * @function isAdmin
 * @memberof booksDecorator
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
const isAdmin = (req, res, next) => {
    if (req.body.isAdmin) {
        next();
    } else {
        res.status(403).json("You are not allowed to perform this action.");
    }
};

/**
 * Añade una nueva transacción de libro.
 * 
 * @function addTransaction
 * @memberof booksDecorator
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Object} Objeto JSON que representa la transacción añadida.
 * @property {mongoose.Types.ObjectId} bookId - ID del libro.
 * @property {mongoose.Types.ObjectId} borrowerId - ID del prestatario.
 * @property {string} bookName - Nombre del libro.
 * @property {string} borrowerName - Nombre del prestatario.
 * @property {string} transactionType - Tipo de transacción (ej. préstamo, devolución).
 * @property {Date} fromDate - Fecha de inicio de la transacción.
 * @property {Date} toDate - Fecha de finalización de la transacción.
 */
router.post("/add-transaction", isAdmin, async (req, res) => {
    try {
        const newTransaction = new BookTransaction({
            bookId: req.body.bookId,
            borrowerId: req.body.borrowerId,
            bookName: req.body.bookName,
            borrowerName: req.body.borrowerName,
            transactionType: req.body.transactionType,
            fromDate: req.body.fromDate,
            toDate: req.body.toDate
        });
        const transaction = await newTransaction.save();
        const book = await Book.findById(req.body.bookId);
        await book.updateOne({ $push: { transactions: transaction._id } });
        res.status(200).json(transaction);
    } catch (err) {
        res.status(504).json(err);
    }
});

/**
 * Obtiene todas las transacciones de libros.
 * 
 * @function getAllTransactions
 * @memberof booksDecorator
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Object} Objeto JSON que contiene todas las transacciones.
 */
router.get("/all-transactions", async (req, res) => {
    try {
        const transactions = await BookTransaction.find({}).sort({ _id: -1 });
        res.status(200).json(transactions);
    } catch (err) {
        return res.status(504).json(err);
    }
});

/**
 * Actualiza una transacción de libro por ID.
 * 
 * @function updateTransaction
 * @memberof booksDecorator
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Object} Mensaje de éxito o error.
 */
router.put("/update-transaction/:id", isAdmin, async (req, res) => {
    try {
        await BookTransaction.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json("Transaction details updated successfully");
    } catch (err) {
        res.status(504).json(err);
    }
});

/**
 * Elimina una transacción de libro por ID.
 * 
 * @function deleteTransaction
 * @memberof booksDecorator
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Object} Mensaje de éxito o error.
 */
router.delete("/remove-transaction/:id", isAdmin, async (req, res) => {
    try {
        const data = await BookTransaction.findByIdAndDelete(req.params.id);
        const book = await Book.findById(data.bookId);
        await book.updateOne({ $pull: { transactions: req.params.id } });
        res.status(200).json("Transaction deleted successfully");
    } catch (err) {
        return res.status(504).json(err);
    }
});

export default router;