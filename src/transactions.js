import express from "express";
import Book from "../models/Book.js";
import BookTransaction from "../models/BookTransaction.js";

const router = express.Router();

/**
 * @class Transactions
 * @description Clase que maneja las transacciones y operaciones relacionadas con los libros.
 */

/**
 * Añade una nueva transacción.
 * @function addTransaction
 * @memberof Transactions
 * @route POST /api/transactions/add-transaction
 * @group Transactions - Operaciones relacionadas con las transacciones de libros
 * @param {Object} req.body - Cuerpo de la solicitud HTTP.
 * @property {boolean} req.body.isAdmin - Indicador de si el usuario es administrador.
 * @property {string} req.body.bookId - ID del libro.
 * @property {string} req.body.borrowerId - ID del prestatario.
 * @property {string} req.body.bookName - Nombre del libro.
 * @property {string} req.body.borrowerName - Nombre del prestatario.
 * @property {string} req.body.transactionType - Tipo de transacción (Emisión o Reserva).
 * @property {string} req.body.fromDate - Fecha de inicio de la transacción.
 * @property {string} req.body.toDate - Fecha de finalización de la transacción.
 * @returns {Object} Objeto JSON que representa la transacción añadida.
 * @property {mongoose.Types.ObjectId} _id - ID de la transacción.
 * @property {string} bookId - ID del libro.
 * @property {string} borrowerId - ID del prestatario.
 * @property {string} bookName - Nombre del libro.
 * @property {string} borrowerName - Nombre del prestatario.
 * @property {string} transactionType - Tipo de transacción (Emisión o Reserva).
 * @property {string} fromDate - Fecha de inicio de la transacción.
 * @property {string} toDate - Fecha de finalización de la transacción.
 * @property {string} transactionStatus - Estado de la transacción.
 * @property {Date} createdAt - Fecha de creación de la transacción.
 * @property {Date} updatedAt - Fecha de última actualización de la transacción.
 */
router.post("/add-transaction", async (req, res) => {
    try {
        if (req.body.isAdmin === true) {
            const newtransaction = await new BookTransaction({
                bookId: req.body.bookId,
                borrowerId: req.body.borrowerId,
                bookName: req.body.bookName,
                borrowerName: req.body.borrowerName,
                transactionType: req.body.transactionType,
                fromDate: req.body.fromDate,
                toDate: req.body.toDate
            });
            const transaction = await newtransaction.save();
            const book = Book.findById(req.body.bookId);
            await book.updateOne({ $push: { transactions: transaction._id } });
            res.status(200).json(transaction);
        } else if (req.body.isAdmin === false) {
            res.status(500).json("You are not allowed to add a Transaction");
        }
    } catch (err) {
        res.status(504).json(err);
    }
});

/**
 * Obtiene todas las transacciones.
 * @function getAllTransactions
 * @memberof Transactions
 * @route GET /api/transactions/all-transactions
 * @group Transactions - Operaciones relacionadas con las transacciones de libros
 * @returns {Object} Objeto JSON que contiene todas las transacciones.
 * @property {mongoose.Types.ObjectId} _id - ID de la transacción.
 * @property {string} bookId - ID del libro.
 * @property {string} borrowerId - ID del prestatario.
 * @property {string} bookName - Nombre del libro.
 * @property {string} borrowerName - Nombre del prestatario.
 * @property {string} transactionType - Tipo de transacción (Emisión o Reserva).
 * @property {string} fromDate - Fecha de inicio de la transacción.
 * @property {string} toDate - Fecha de finalización de la transacción.
 * @property {string} transactionStatus - Estado de la transacción.
 * @property {Date} createdAt - Fecha de creación de la transacción.
 * @property {Date} updatedAt - Fecha de última actualización de la transacción.
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
 * Actualiza una transacción por su ID.
 * @function updateTransaction
 * @memberof Transactions
 * @route PUT /api/transactions/update-transaction/:id
 * @group Transactions - Operaciones relacionadas con las transacciones de libros
 * @param {Object} req.body - Cuerpo de la solicitud HTTP.
 * @property {boolean} req.body.isAdmin - Indicador de si el usuario es administrador.
 * @property {string} req.params.id - ID de la transacción a actualizar.
 * @returns {string} Mensaje de éxito.
 */
router.put("/update-transaction/:id", async (req, res) => {
    try {
        if (req.body.isAdmin) {
            await BookTransaction.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Transaction details updated successfully");
        }
    } catch (err) {
        res.status(504).json(err);
    }
});

/**
 * Elimina una transacción por su ID.
 * @function removeTransaction
 * @memberof Transactions
 * @route DELETE /api/transactions/remove-transaction/:id
 * @group Transactions - Operaciones relacionadas con las transacciones de libros
 * @param {Object} req.body - Cuerpo de la solicitud HTTP.
 * @property {boolean} req.body.isAdmin - Indicador de si el usuario es administrador.
 * @property {string} req.params.id - ID de la transacción a eliminar.
 * @returns {string} Mensaje de éxito.
 */
router.delete("/remove-transaction/:id", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const data = await BookTransaction.findByIdAndDelete(req.params.id);
            const book = Book.findById(data.bookId);
            console.log(book);
            await book.updateOne({ $pull: { transactions: req.params.id } });
            res.status(200).json("Transaction deleted successfully");
        } catch (err) {
            return res.status(504).json(err);
        }
    } else {
        return res.status(403).json("You dont have permission to delete a book!");
    }
});

export default router;







