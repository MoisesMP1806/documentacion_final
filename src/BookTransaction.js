import mongoose from "mongoose";
/**
 * modulo para clases sin patrones de diseño
 * @module BookTransaction
 */

/**
 * Esquema para una Transacción de Libro.
 * @typedef {Object} BookTransaction
 * @property {string} bookId - El ID del libro.
 * @property {string} borrowerId - El ID del prestatario (EmployeeId o AdmissionId).
 * @property {string} bookName - El nombre del libro.
 * @property {string} borrowerName - El nombre del prestatario.
 * @property {string} transactionType - El tipo de transacción (Issue o Reservation).
 * @property {string} fromDate - La fecha de inicio de la transacción.
 * @property {string} toDate - La fecha de finalización de la transacción.
 * @property {string} [returnDate] - La fecha de devolución del libro.
 * @property {string} [transactionStatus] - El estado de la transacción. Por defecto es 'Active'.
 */

/**
 * Esquema de Mongoose para una Transacción de Libro.
 * @type {BookTransaction}
 */

/**
 * Modelo de Mongoose para una Transacción de Libro.
 * @type {mongoose.Model<BookTransactionSchema>}
 */

const BookTransactionSchema = new mongoose.Schema({
    bookId: {
        type: String,
        require: true
    },
    borrowerId: { //EmployeeId or AdmissionId
        type: String,
        require: true
    },
    bookName: {
        type: String,
        require: true
    },
    borrowerName: {
        type: String,
        require: true
    },
    transactionType: { //Issue or Reservation
        type: String,
        require: true
    },
    fromDate: {
        type: String,
        require: true
    },
    toDate: {
        type: String,
        require: true
    },
    returnDate: {
        type: String
    },
    transactionStatus: {
        type: String,
        default: "Active"
    }
}, {
    timestamps: true
});

export default mongoose.model("BookTransaction", BookTransactionSchema);