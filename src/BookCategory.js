import mongoose from "mongoose";
/**
 * modulo para clases sin patrones de diseño
 * @module BookCategory
 */

/**
 * Esquema para una Categoría de Libro.
 * @typedef {Object} BookCategory
 * @property {string} categoryName - El nombre de la categoría. Debe ser único.
 * @property {mongoose.Types.ObjectId[]} books - Arreglo de IDs de libros asociados con esta categoría.
 */

/**
 * Esquema de Mongoose para una Categoría de Libro.
 * @type {BookCategory}
 */

/**
 * Modelo de Mongoose para una Categoría de Libro.
 * @type {mongoose.Model<BookCategorySchema>}
 */


const BookCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        unique: true
    },
    books: [{
        type: mongoose.Types.ObjectId,
        ref: "Book"
    }]
}, {
    timestamps: true
});

export default mongoose.model("BookCategory", BookCategorySchema);