import mongoose from "mongoose";
/**
 * modulo para clases sin patrones de diseño
 * @module Book
 */


/**
 * Esquema para un Libro.
 * @typedef {Object} Book
 * @property {string} bookName - El nombre del libro.
 * @property {string} [alternateTitle] - Un título alternativo para el libro. Por defecto es una cadena vacía.
 * @property {string} author - El autor del libro.
 * @property {string} [language] - El idioma en el que está escrito el libro. Por defecto es una cadena vacía.
 * @property {string} [publisher] - La editorial del libro. Por defecto es una cadena vacía.
 * @property {number} bookCountAvailable - El número de copias disponibles de este libro.
 * @property {string} [bookStatus] - El estado del libro. Por defecto es 'Available'.
 * @property {mongoose.Types.ObjectId[]} categories - Arreglo de IDs de categorías a las que pertenece el libro.
 * @property {mongoose.Types.ObjectId[]} transactions - Arreglo de IDs de transacciones asociadas con el libro.
 */

/**
 * Esquema de Mongoose para un Libro.
 * @type {Book}
 */

/**
 * Modelo de Mongoose para un Libro.
 * @type {mongoose.Model<BookSchema>}
 */

const BookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        require: true
    },
    alternateTitle: {
        type: String,
        default: ""
    },
    author: {
        type: String,
        require: true
    },
    language: {
        type: String,
        default: ""
    },
    publisher: {
        type: String,
        default: ""
    },
    bookCountAvailable: {
        type: Number,
        require: true
    },
    bookStatus: {
        type: String,
        default: "Available"
    },
    categories: [{ 
        type: mongoose.Types.ObjectId, 
        ref: "BookCategory" 
    }],
    transactions: [{
        type: mongoose.Types.ObjectId,
        ref: "BookTransaction"
    }]
}, {
    timestamps: true
});

export default mongoose.model("Book", BookSchema);