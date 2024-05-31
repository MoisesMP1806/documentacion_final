/**
 * En esta clase se refactoriza el código de la clase Book para implementar el patrón
 * de diseño builder.
 * @type {BookBuilder}
 *
 */
/**
 * Ejemplo de uso del patrón Builder en la función para agregar un libro.
 * @example
 * router.post("/addbook", async (req, res) => {
 *     if (req.body.isAdmin) {
 *         try {
 *             // Usar BookBuilder para construir el objeto del libro
 *             const newbook = new BookBuilder()
 *                 .setBookName(req.body.bookName)
 *                 .setAlternateTitle(req.body.alternateTitle)
 *                 .setAuthor(req.body.author)
 *                 .setBookCountAvailable(req.body.bookCountAvailable)
 *                 .setLanguage(req.body.language)
 *                 .setPublisher(req.body.publisher)
 *                 .setBookStatus(req.body.bookStatus)
 *                 .setCategories(req.body.categories)
 *                 .build();
 * 
 *             const book = await newbook.save();
 *             await BookCategory.updateMany({ '_id': book.categories }, { $push: { books: book._id } });
 *             res.status(200).json(book);
 *         } catch (err) {
 *             res.status(504).json(err);
 *         }
 *     } else {
 *         return res.status(403).json("You don't have permission to add a book!");
 *     }
 * });
 */
class BookBuilder {
    constructor() {
        this.book = {};
    }

    /**
     * Establece el nombre del libro.
     * @param {string} bookName - El nombre del libro.
     * @returns {BookBuilder} - La instancia del constructor de libro.
     */
    setBookName(bookName) {
        this.book.bookName = {
            type: String,
            required: true,
            default: bookName
        };
        return this;
    }

    /**
     * Establece el título alternativo del libro.
     * @param {string} alternateTitle - El título alternativo del libro.
     * @returns {BookBuilder} - La instancia del constructor de libro.
     */
    setAlternateTitle(alternateTitle) {
        this.book.alternateTitle = {
            type: String,
            default: alternateTitle
        };
        return this;
    }

    /**
     * Establece el autor del libro.
     * @param {string} author - El autor del libro.
     * @returns {BookBuilder} - La instancia del constructor de libro.
     */
    setAuthor(author) {
        this.book.author = {
            type: String,
            required: true,
            default: author
        };
        return this;
    }

    /**
     * Establece el idioma del libro.
     * @param {string} language - El idioma del libro.
     * @returns {BookBuilder} - La instancia del constructor de libro.
     */
    setLanguage(language) {
        this.book.language = {
            type: String,
            default: language
        };
        return this;
    }

    /**
     * Establece la editorial del libro.
     * @param {string} publisher - La editorial del libro.
     * @returns {BookBuilder} - La instancia del constructor de libro.
     */
    setPublisher(publisher) {
        this.book.publisher = {
            type: String,
            default: publisher
        };
        return this;
    }

    /**
     * Establece el número de copias disponibles del libro.
     * @param {number} bookCountAvailable - El número de copias disponibles del libro.
     * @returns {BookBuilder} - La instancia del constructor de libro.
     */
    setBookCountAvailable(bookCountAvailable) {
        this.book.bookCountAvailable = {
            type: Number,
            required: true,
            default: bookCountAvailable
        };
        return this;
    }

    /**
     * Establece el estado del libro.
     * @param {string} bookStatus - El estado del libro.
     * @returns {BookBuilder} - La instancia del constructor de libro.
     */
    setBookStatus(bookStatus) {
        this.book.bookStatus = {
            type: String,
            default: bookStatus
        };
        return this;
    }

    /**
     * Establece las categorías a las que pertenece el libro.
     * @param {string} categories - Las categorías a las que pertenece el libro.
     * @returns {BookBuilder} - La instancia del constructor de libro.
     */
    setCategories(categories) {
        this.book.categories = [{ 
            type: mongoose.Types.ObjectId, 
            ref: "BookCategory",
            default: categories
        }];
        return this;
    }

    /**
     * Establece las transacciones asociadas con el libro.
     * @param {string} transactions - Las transacciones asociadas con el libro.
     * @returns {BookBuilder} - La instancia del constructor de libro.
     */
    setTransactions(transactions) {
        this.book.transactions = [{
            type: mongoose.Types.ObjectId,
            ref: "BookTransaction",
            default: transactions
        }];
        return this;
    }

    /**
     * Construye el esquema de mongoose para el libro.
     * @returns {mongoose.Model} - El modelo de mongoose para el libro.
     */
    build() {
        return mongoose.model("Book", new mongoose.Schema(this.book, { timestamps: true }));
    }
}

export default BookBuilder;
