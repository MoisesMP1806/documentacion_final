import express from "express";
import User from "../models/User.js";

const router = express.Router();

/**
 * @class Users
 * @description Clase que maneja las operaciones relacionadas con los usuarios.
 */

/**
 * Obtiene un usuario por su ID.
 * @function getUserById
 * @memberof Users
 * @route GET /api/users/getuser/:id
 * @group Users - Operaciones relacionadas con los usuarios
 * @param {Object} req.params - Parámetros de la solicitud HTTP.
 * @property {string} req.params.id - ID del usuario.
 * @returns {Object} Objeto JSON que representa el usuario encontrado, excluyendo la contraseña y la fecha de última actualización.
 * @property {string} _id - ID del usuario.
 * @property {string} userType - Tipo de usuario.
 * @property {string} userFullName - Nombre completo del usuario.
 * @property {string} [admissionId] - ID de admisión del usuario.
 * @property {string} [employeeId] - ID del empleado.
 * @property {number} [age] - Edad del usuario.
 * @property {string} [dob] - Fecha de nacimiento del usuario.
 * @property {string} [gender] - Género del usuario.
 * @property {string} [address] - Dirección del usuario.
 * @property {number} mobileNumber - Número de teléfono móvil del usuario.
 * @property {string} email - Correo electrónico del usuario.
 * @property {number} points - Puntos acumulados del usuario.
 * @property {boolean} isAdmin - Indicador de si el usuario es administrador.
 * @property {Array.<mongoose.Types.ObjectId>} activeTransactions - Lista de IDs de transacciones activas del usuario.
 * @property {Array.<mongoose.Types.ObjectId>} prevTransactions - Lista de IDs de transacciones previas del usuario.
 * @property {Date} createdAt - Fecha de creación del usuario.
 * @property {Date} updatedAt - Fecha de última actualización del usuario.
 */
router.get("/getuser/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("activeTransactions").populate("prevTransactions");
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err);
    }
});

/**
 * Obtiene todos los miembros de la biblioteca.
 * @function getAllMembers
 * @memberof Users
 * @route GET /api/users/allmembers
 * @group Users - Operaciones relacionadas con los usuarios
 * @returns {Object} Objeto JSON que contiene todos los usuarios.
 * @property {Array.<Object>} users - Lista de usuarios.
 * @property {string} users._id - ID del usuario.
 * @property {string} users.userType - Tipo de usuario.
 * @property {string} users.userFullName - Nombre completo del usuario.
 * @property {string} [users.admissionId] - ID de admisión del usuario.
 * @property {string} [users.employeeId] - ID del empleado.
 * @property {number} [users.age] - Edad del usuario.
 * @property {string} [users.dob] - Fecha de nacimiento del usuario.
 * @property {string} [users.gender] - Género del usuario.
 * @property {string} [users.address] - Dirección del usuario.
 * @property {number} users.mobileNumber - Número de teléfono móvil del usuario.
 * @property {string} users.email - Correo electrónico del usuario.
 * @property {number} users.points - Puntos acumulados del usuario.
 * @property {boolean} users.isAdmin - Indicador de si el usuario es administrador.
 * @property {Array.<mongoose.Types.ObjectId>} users.activeTransactions - Lista de IDs de transacciones activas del usuario.
 * @property {Array.<mongoose.Types.ObjectId>} users.prevTransactions - Lista de IDs de transacciones previas del usuario.
 * @property {Date} users.createdAt - Fecha de creación del usuario.
 * @property {Date} users.updatedAt - Fecha de última actualización del usuario.
 */
router.get("/allmembers", async (req, res) => {
    try {
        const users = await User.find({}).populate("activeTransactions").populate("prevTransactions").sort({ _id: -1 });
        res.status(200).json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
});

/**
 * Actualiza un usuario por su ID.
 * @function updateUserById
 * @memberof Users
 * @route PUT /api/users/updateuser/:id
 * @group Users - Operaciones relacionadas con los usuarios
 * @param {Object} req.params - Parámetros de la solicitud HTTP.
 * @property {string} req.params.id - ID del usuario a actualizar.
 * @param {Object} req.body - Cuerpo de la solicitud HTTP.
 * @property {string} req.body.userId - ID del usuario que realiza la solicitud.
 * @property {boolean} req.body.isAdmin - Indicador de si el usuario es administrador.
 * @property {string} [req.body.password] - Nueva contraseña del usuario (si se proporciona).
 * @returns {string} Mensaje de éxito.
 */
router.put("/updateuser/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update only your account!");
    }
});

/**
 * Añade una transacción a la lista de transacciones activas de un usuario.
 * @function moveToActiveTransactions
 * @memberof Users
 * @route PUT /api/users/:id/move-to-activetransactions
 * @group Users - Operaciones relacionadas con los usuarios
 * @param {Object} req.params - Parámetros de la solicitud HTTP.
 * @property {string} req.params.id - ID de la transacción a mover.
 * @param {Object} req.body - Cuerpo de la solicitud HTTP.
 * @property {boolean} req.body.isAdmin - Indicador de si el usuario es administrador.
 * @property {string} req.body.userId - ID del usuario al que se añadirá la transacción.
 * @returns {string} Mensaje de éxito.
 */
router.put("/:id/move-to-activetransactions", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const user = await User.findById(req.body.userId);
            await user.updateOne({ $push: { activeTransactions: req.params.id } });
            res.status(200).json("Added to Active Transaction");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Only Admin can add a transaction");
    }
});

/**
 * Añade una transacción a la lista de transacciones previas de un usuario y la elimina de la lista de transacciones activas.
 * @function moveToPrevTransactions
 * @memberof Users
 * @route PUT /api/users/:id/move-to-prevtransactions
 * @group Users - Operaciones relacionadas con los usuarios
 * @param {Object} req.params - Parámetros de la solicitud HTTP.
 * @property {string} req.params.id - ID de la transacción a mover.
 * @param {Object} req.body - Cuerpo de la solicitud HTTP.
 * @property {boolean} req.body.isAdmin - Indicador de si el usuario es administrador.
 * @property {string} req.body.userId - ID del usuario al que se añadirá la transacción.
 * @returns {string} Mensaje de éxito.
 */
router.put("/:id/move-to-prevtransactions", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const user = await User.findById(req.body.userId);
            await user.updateOne({ $pull: { activeTransactions: req.params.id } });
            await user.updateOne({ $push: { prevTransactions: req.params.id } });
            res.status(200).json("Added to Prev transaction Transaction");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Only Admin can do this");
    }
});

/**
 * Elimina un usuario por su ID.
 * @function deleteUserById
 * @memberof Users
 * @route DELETE /api/users/deleteuser/:id
 * @group Users - Operaciones relacionadas con los usuarios
 * @param {Object} req.params - Parámetros de la solicitud HTTP.
 * @property {string} req.params.id - ID del usuario a eliminar.
 * @param {Object} req.body - Cuerpo de la solicitud HTTP.
 * @property {string} req.body.userId - ID del usuario que realiza la solicitud.
 * @property {boolean} req.body.isAdmin - Indicador de si el usuario es administrador.
 * @returns {string} Mensaje de éxito.
 */
router.delete("/deleteuser/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
});

export default router;