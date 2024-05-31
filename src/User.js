import mongoose from "mongoose";
/**
 * modulo para clases sin patrones de diseño
 * @module User
 */

/**
 * Esquema para un Usuario.
 * @typedef {Object} User
 * @property {string} userType - El tipo de usuario.
 * @property {string} userFullName - El nombre completo del usuario. Debe ser único.
 * @property {string} [admissionId] - ID de admisión del usuario. Longitud mínima de 3 y máxima de 15 caracteres.
 * @property {string} [employeeId] - ID de empleado del usuario. Longitud mínima de 3 y máxima de 15 caracteres.
 * @property {number} [age] - La edad del usuario.
 * @property {string} [gender] - El género del usuario.
 * @property {string} [dob] - La fecha de nacimiento del usuario.
 * @property {string} [address] - La dirección del usuario. Por defecto es una cadena vacía.
 * @property {number} mobileNumber - El número de móvil del usuario.
 * @property {string} [photo] - La foto del usuario. Por defecto es una cadena vacía.
 * @property {string} email - El correo electrónico del usuario. Debe ser único y tiene un máximo de 50 caracteres.
 * @property {string} password - La contraseña del usuario. Longitud mínima de 6 caracteres.
 * @property {number} [points] - Los puntos acumulados por el usuario. Por defecto es 0.
 * @property {mongoose.Types.ObjectId[]} activeTransactions - Array de IDs de transacciones activas asociadas al usuario.
 * @property {mongoose.Types.ObjectId[]} prevTransactions - Array de IDs de transacciones previas asociadas al usuario.
 * @property {boolean} [isAdmin] - Indica si el usuario es administrador. Por defecto es false.
 * @property {Date} [createdAt] - Marca de tiempo de creación del usuario.
 * @property {Date} [updatedAt] - Marca de tiempo de última actualización del usuario.
 */

/**
 * Esquema de Mongoose para un Usuario.
 * @type {User}
 */

/**
 * Modelo de Mongoose para un Usuario.
 * @type {mongoose.Model<UserSchema>}
 */

const UserSchema = new mongoose.Schema({
    userType: {
        type: String,
        require: true
    },
    userFullName: {
        type: String,
        require: true,
        unique: true
    },
    admissionId: {
        type: String,
        min: 3,
        max: 15,
    },
    employeeId: {
        type: String,
        min: 3,
        max: 15,
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    dob: {
        type: String
    },
    address: {
        type: String,
        default: ""
    },
    mobileNumber: {
        type: Number,
        require: true
    },
    photo: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    points: {
        type: Number,
        default: 0
    },
    activeTransactions: [{
        type: mongoose.Types.ObjectId,
        ref: "BookTransaction"
    }],
    prevTransactions: [{
        type: mongoose.Types.ObjectId,
        ref: "BookTransaction"
    }],
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.model("User", UserSchema);