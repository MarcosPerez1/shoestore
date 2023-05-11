const { hash } = require("simple-stateless-auth-library")

const { createUser } = require("../../models/auth")

const errors = require("../../misc/errors")

module.exports = (db) => async (req, res, next) => {

    const { username, age, password, email, address, city } = req.body

     if (!username || !password || !age || !city || !address || !email) return next(errors[400])

    const encrypted = await hash.encrypt(password)

    const response = await createUser(await db)(username, encrypted, address, age, city, email)

    if (!response.ok) return next(errors[500])

    res.status(200).json({
        success: true,
    })
                                                    }