import mongoose from "mongoose";
/**
 * En esta clase se refactoriza el código de la clase BookTransaction para implementar el patrón
 * de diseño builder.
 * @type {BookTransactionBuilder}
 *
 */
/**
 * Ejemplo de uso del patrón Builder en la función para agregar una transacción de libro.
 * @example
 * router.post("/add-transaction", async (req, res) => {
 *     try {
 *         if (req.body.isAdmin === true) {
 *             // Usar BookTransactionBuilder para construir el objeto de la transacción
 *             const newTransaction = new BookTransactionBuilder()
 *                 .setBookId(req.body.bookId)
 *                 .setBorrowerId(req.body.borrowerId)
 *                 .setBookName(req.body.bookName)
 *                 .setBorrowerName(req.body.borrowerName)
 *                 .setTransactionType(req.body.transactionType)
 *                 .setFromDate(req.body.fromDate)
 *                 .setToDate(req.body.toDate)
 *                 .build();
 * 
 *             const transaction = await new newTransaction(req.body).save();
 *             const book = await Book.findById(req.body.bookId);
 *             await book.updateOne({ $push: { transactions: transaction._id } });
 *             res.status(200).json(transaction);
 *         } else if (req.body.isAdmin === false) {
 *             res.status(500).json("You are not allowed to add a Transaction");
 *         }
 *     } catch (err) {
 *         res.status(504).json(err);
 *     }
 * });
 */

class BookTransactionBuilder {
    constructor() {
        this.transaction = {};
    }

    /**
     * Establece el ID del libro.
     * @param {string} bookId - El ID del libro.
     * @returns {BookTransactionBuilder} - La instancia del constructor de la transacción del libro.
     */
    setBookId(bookId) {
        this.transaction.bookId = {
            type: String,
            required: true,
            default: bookId
        };
        return this;
    }

    /**
     * Establece el ID del prestatario.
     * @param {string} borrowerId - El ID del prestatario.
     * @returns {BookTransactionBuilder} - La instancia del constructor de la transacción del libro.
     */
    setBorrowerId(borrowerId) {
        this.transaction.borrowerId = {
            type: String,
            required: true,
            default: borrowerId
        };
        return this;
    }

    /**
     * Establece el nombre del libro.
     * @param {string} bookName - El nombre del libro.
     * @returns {BookTransactionBuilder} - La instancia del constructor de la transacción del libro.
     */
    setBookName(bookName) {
        this.transaction.bookName = {
            type: String,
            required: true,
            default: bookName
        };
        return this;
    }

    /**
     * Establece el nombre del prestatario.
     * @param {string} borrowerName - El nombre del prestatario.
     * @returns {BookTransactionBuilder} - La instancia del constructor de la transacción del libro.
     */
    setBorrowerName(borrowerName) {
        this.transaction.borrowerName = {
            type: String,
            required: true,
            default: borrowerName
        };
        return this;
    }

    /**
     * Establece el tipo de transacción.
     * @param {string} transactionType - El tipo de transacción.
     * @returns {BookTransactionBuilder} - La instancia del constructor de la transacción del libro.
     */
    setTransactionType(transactionType) {
        this.transaction.transactionType = {
            type: String,
            required: true,
            default: transactionType
        };
        return this;
    }

    /**
     * Establece la fecha de inicio de la transacción.
     * @param {string} fromDate - La fecha de inicio de la transacción.
     * @returns {BookTransactionBuilder} - La instancia del constructor de la transacción del libro.
     */
    setFromDate(fromDate) {
        this.transaction.fromDate = {
            type: String,
            required: true,
            default: fromDate
        };
        return this;
    }

    /**
     * Establece la fecha de fin de la transacción.
     * @param {string} toDate - La fecha de fin de la transacción.
     * @returns {BookTransactionBuilder} - La instancia del constructor de la transacción del libro.
     */
    setToDate(toDate) {
        this.transaction.toDate = {
            type: String,
            required: true,
            default: toDate
        };
        return this;
    }

    /**
     * Establece la fecha de devolución del libro.
     * @param {string} returnDate - La fecha de devolución del libro.
     * @returns {BookTransactionBuilder} - La instancia del constructor de la transacción del libro.
     */
    setReturnDate(returnDate) {
        this.transaction.returnDate = {
            type: String,
            default: returnDate
        };
        return this;
    }

    /**
     * Establece el estado de la transacción.
     * @param {string} transactionStatus - El estado de la transacción.
     * @returns {BookTransactionBuilder} - La instancia del constructor de la transacción del libro.
     */
    setTransactionStatus(transactionStatus) {
        this.transaction.transactionStatus = {
            type: String,
            default: "Active"
        };
        return this;
    }

    /**
     * Construye el esquema de mongoose para la transacción del libro.
     * @returns {mongoose.Model} - El modelo de mongoose para la transacción del libro.
     */
    build() {
        return mongoose.model("BookTransaction", new mongoose.Schema(this.transaction, { timestamps: true }));
    }
}

export default BookTransactionBuilder;