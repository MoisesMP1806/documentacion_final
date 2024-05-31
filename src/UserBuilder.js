import mongoose from "mongoose";
/**
 * En esta clase se refactoriza el código de la clase User para implementar el patrón
 * de diseño builder.
 * @type {UserBuilder}
 *
 */
/**
 * Ejemplo de uso del patrón Builder en la función para registrar un usuario.
 * @example
 * router.post("/register", async (req, res) => {
 *   try {
 *     // Salting y hash del password
 *     const salt = await bcrypt.genSalt(10);
 *     const hashedPass = await bcrypt.hash(req.body.password, salt);
 *
 *     // Usar UserBuilder para construir el objeto del usuario
 *     const newuser = new UserBuilder()
 *       .setUserType(req.body.userType)
 *       .setUserFullName(req.body.userFullName)
 *       .setAdmissionId(req.body.admissionId)
 *       .setEmployeeId(req.body.employeeId)
 *       .setAge(req.body.age)
 *       .setGender(req.body.gender)
 *       .setDOB(req.body.dob)
 *       .setAddress(req.body.address)
 *       .setMobileNumber(req.body.mobileNumber)
 *       .setPhoto(req.body.photo)
 *       .setEmail(req.body.email)
 *       .setPassword(hashedPass)
 *       .setIsAdmin(req.body.isAdmin)
 *       .build();
 *
 *     // Guardar usuario y devolver respuesta
 *     const user = await newuser.save();
 *     res.status(200).json(user);
 *   } catch (err) {
 *     console.log(err);
 *   }
 * });
 */


class UserBuilder {
    constructor() {
        this.user = {
            type: mongoose.Schema.Types.ObjectId
        };
    }

    /**
     * Establece el tipo de usuario.
     * @param {string} userType - El tipo de usuario.
     * @returns {UserBuilder} - La instancia del constructor del usuario.
     */
    setUserType(userType) {
        this.user.userType = {
            type: String,
            required: true
        };
        return this;
    }

    /**
     * Establece el nombre completo del usuario.
     * @param {string} userFullName - El nombre completo del usuario.
     * @returns {UserBuilder} - La instancia del constructor del usuario.
     */
    setUserFullName(userFullName) {
        this.user.userFullName = {
            type: String,
            required: true,
            unique: true
        };
        return this;
    }

    /**
     * Establece el ID de admisión.
     * @param {string} admissionId - El ID de admisión.
     * @returns {UserBuilder} - La instancia del constructor del usuario.
     */
    setAdmissionId(admissionId) {
        this.user.admissionId = {
            type: String,
            minlength: 3,
            maxlength: 15
        };
        return this;
    }

    /**
     * Establece el ID del empleado.
     * @param {string} employeeId - El ID del empleado.
     * @returns {UserBuilder} - La instancia del constructor del usuario.
     */
    setEmployeeId(employeeId) {
        this.user.employeeId = {
            type: String,
            min: 3,
            max: 15
        };
        return this;
    }

    /**
     * Establece la edad del usuario.
     * @param {number} age - La edad del usuario.
     * @returns {UserBuilder} - La instancia del constructor del usuario.
     */
    setAge(age) {
        this.user.age = {
            type: Number
        };
        return this;
    }

    /**
     * Establece el género del usuario.
     * @param {string} gender - El género del usuario.
     * @returns {UserBuilder} - La instancia del constructor del usuario.
     */
    setGender(gender) {
        this.user.gender = {
            type: String
        };
        return this;
    }

    /**
     * Establece la fecha de nacimiento del usuario.
     * @param {string} dob - La fecha de nacimiento del usuario.
     * @returns {UserBuilder} - La instancia del constructor del usuario.
     */
    setDOB(dob) {
        this.user.dob = {
            type: String
        };
        return this;
    }

    /**
     * Establece la dirección del usuario.
     * @param {string} address - La dirección del usuario.
     * @returns {UserBuilder} - La instancia del constructor del usuario.
     */
    setAddress(address) {
        this.user.address = {
            type: String,
            default: ""
        };
        return this;
    }

    /**
     * Establece el número de móvil del usuario.
     * @param {number} mobileNumber - El número de móvil del usuario.
     * @returns {UserBuilder} - La instancia del constructor del usuario.
     */
    setMobileNumber(mobileNumber) {
        this.user.mobileNumber = {
            type: Number,
            required: true
        };
        return this;
    }

    /**
     * Establece la foto del usuario.
     * @param {string} photo - La foto del usuario.
     * @returns {UserBuilder} - La instancia del constructor del usuario.
     */
    setPhoto(photo) {
        this.user.photo = {
            type: String,
            default: ""
        };
        return this;
    }

    /**
     * Establece el correo electrónico del usuario.
     * @param {string} email - El correo electrónico del usuario.
     * @returns {UserBuilder} - La instancia del constructor del usuario.
     */
    setEmail(email) {
        this.user.email = {
            type: String,
            required: true,
            maxlength: 50,
            unique: true
        };
        return this;
    }

    /**
     * Establece la contraseña del usuario.
     * @param {string} password - La contraseña del usuario.
     * @returns {UserBuilder} - La instancia del constructor del usuario.
     */
    setPassword(password) {
        this.user.password = {
            type: String,
            required: true,
            min: 6
        };
        return this;
    }

    /**
     * Establece los puntos del usuario.
     * @param {number} points - Los puntos del usuario.
     * @returns {UserBuilder} - La instancia del constructor del usuario.
     */
    setPoints(points) {
        this.user.points = {
            type: Number,
            default: 0
        };
        return this;
    }

    /**
     * Establece las transacciones activas del usuario.
     * @param {string} activeTransactions - Las transacciones activas del usuario.
     * @returns {UserBuilder} - La instancia del constructor del usuario.
     */
    setActiveTransactions(activeTransactions) {
        this.user.activeTransactions = [{
            type: mongoose.Types.ObjectId,
            ref: "BookTransaction"
        }];
        return this;
    }

    /**
     * Establece las transacciones previas del usuario.
     * @param {string} prevTransactions - Las transacciones previas del usuario.
     * @returns {UserBuilder} - La instancia del constructor del usuario.
     */
    setPrevTransactions(prevTransactions) {
        this.user.prevTransactions = [{
            type: mongoose.Types.ObjectId,
            ref: "BookTransaction"
        }];
        return this;
    }

    /**
     * Establece si el usuario es administrador.
     * @param {boolean} isAdmin - Si el usuario es administrador.
     * @returns {UserBuilder} - La instancia del constructor del usuario.
     */
    setIsAdmin(isAdmin) {
        this.user.isAdmin = {
            type: Boolean,
            default: false
        };
        return this;
    }

    /**
     * Construye el esquema de mongoose para el usuario.
     * @returns {mongoose.Model} - El modelo de mongoose para el usuario.
     */
    build() {
        return mongoose.model("User", new mongoose.Schema(this.user, { timestamps: true }));
    }
}

export default UserBuilder;