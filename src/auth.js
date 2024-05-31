import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

/**
 * @class Auth
 * @description Clase que maneja las rutas de autenticación de usuarios.
 */

/**
 * Maneja la solicitud de registro de un nuevo usuario.
 * @function register
 * @memberof Auth
 * @param {Object} req.body - Cuerpo de la solicitud HTTP.
 * @property {string} req.body.userType - Tipo de usuario.
 * @property {string} req.body.userFullName - Nombre completo del usuario.
 * @property {string} req.body.admissionId - ID de admisión del usuario.
 * @property {string} req.body.employeeId - ID de empleado del usuario.
 * @property {number} req.body.age - Edad del usuario.
 * @property {string} req.body.dob - Fecha de nacimiento del usuario.
 * @property {string} req.body.gender - Género del usuario.
 * @property {string} req.body.address - Dirección del usuario.
 * @property {number} req.body.mobileNumber - Número de teléfono móvil del usuario.
 * @property {string} req.body.email - Correo electrónico del usuario.
 * @property {string} req.body.password - Contraseña del usuario.
 * @property {boolean} req.body.isAdmin - Indica si el usuario es un administrador.
 * @returns {Object} Objeto JSON que representa al usuario registrado.
 */
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newuser = await new User({
      userType: req.body.userType,
      userFullName: req.body.userFullName,
      admissionId: req.body.admissionId,
      employeeId: req.body.employeeId,
      age: req.body.age,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email,
      password: hashedPass,
      isAdmin: req.body.isAdmin,
    });

    const user = await newuser.save();
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * Maneja la solicitud de inicio de sesión de un usuario.
 * @function signin
 * @memberof Auth
 * @param {Object} req.body - Cuerpo de la solicitud HTTP.
 * @property {(string|null)} req.body.admissionId - ID de admisión del usuario.
 * @property {(string|null)} req.body.employeeId - ID de empleado del usuario.
 * @property {string} req.body.password - Contraseña del usuario.
 * @returns {Object} Objeto JSON que representa al usuario autenticado.
 */
router.post("/signin", async (req, res) => {
  try {
    const user = req.body.admissionId
      ? await User.findOne({
          admissionId: req.body.admissionId,
        })
      : await User.findOne({
          employeeId: req.body.employeeId,
        });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;