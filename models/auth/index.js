
const { ComparisonPredicateToken } = require("slonik/dist/tokens")
const { insertUser, selectByUser } = require("./queries")

const createUser = (db) => async (username, password, address, age, city, email) => {
    try {
        await db.query(insertUser(username, password, address, age, city, email))
        return {
            ok: true
        }
    } catch (error) {
        console.info("usuario no creado", error.message)
        return {
            ok: false,
            message: error.message,
        }
    }
}

const selectUser = (db) => async (username, compareFn) => {
    try {
        const user = await db.maybeOne(selectByUser(username))

        console.info("USER:",user)

        if(!user)return {
            ok:false,
            error_code:"wrong_data"
        }

        const areEqual = await compareFn(user.password)

       if(!areEqual)return {
        ok:false,
        error_code:"wrong_data"
       }

        return {
            ok: true,
            content:{
                username:user.username
            }
        }
    } catch (error) {
        console.info("usuario no creado", error.message)
        return {
            ok: false,
            message: error.message,
        }
    }
}


module.exports = {
    createUser,
    selectUser
}