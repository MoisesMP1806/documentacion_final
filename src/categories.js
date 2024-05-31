import express from "express";
import BookCategory from "../models/BookCategory.js";

const router = express.Router();

/**
 * @class Categories
 * @description Clase que maneja las rutas de operaciones relacionadas con las categorías de libros.
 */

/**
 * Obtiene todas las categorías en la base de datos.
 * @function getAllCategories
 * @memberof Categories
 * @route GET /api/categories/allcategories
 * @group Categories - Operaciones relacionadas con categorías de libros
 * @returns {Object} Objeto JSON que contiene todas las categorías.
 * @property {mongoose.Types.ObjectId} _id - ID de la categoría.
 * @property {string} categoryName - Nombre de la categoría.
 * @property {mongoose.Types.ObjectId[]} books - Lista de IDs de los libros que pertenecen a esta categoría.
 * @property {Date} createdAt - Fecha de creación de la categoría.
 * @property {Date} updatedAt - Fecha de última actualización de la categoría.
 */
router.get("/allcategories", async (req, res) => {
  try {
    const categories = await BookCategory.find({});
    res.status(200).json(categories);
  } catch (err) {
    return res.status(504).json(err);
  }
});

/**
 * Añade una nueva categoría.
 * @function addCategory
 * @memberof Categories
 * @group Categories - Operaciones relacionadas con categorías de libros
 * @param {Object} req.body - Cuerpo de la solicitud HTTP.
 * @property {string} req.body.categoryName - Nombre de la nueva categoría.
 * @returns {Object} Objeto JSON que representa la categoría añadida.
 * @property {mongoose.Types.ObjectId} _id - ID de la nueva categoría.
 * @property {string} categoryName - Nombre de la nueva categoría.
 * @property {mongoose.Types.ObjectId[]} books - Lista de IDs de los libros que pertenecen a esta categoría.
 * @property {Date} createdAt - Fecha de creación de la categoría.
 * @property {Date} updatedAt - Fecha de última actualización de la categoría.
 */
router.post("/addcategory", async (req, res) => {
  try {
    const newcategory = await new BookCategory({
      categoryName: req.body.categoryName,
    });
    const category = await newcategory.save();
    res.status(200).json(category);
  } catch (err) {
    return res.status(504).json(err);
  }
});

export default router;