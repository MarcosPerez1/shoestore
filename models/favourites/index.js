const {newFavourite,deleteFav}=require("./queries")

const addFavourite = (db) => async (shoeId,userId) => {
    try {
        const response = await db.query(newFavourite(shoeId,userId))
        return {
            ok: true,
            response: response.rows
        }
    } catch (error) {

        return {
            ok: false,
            message: error.message
        }

    }
}

const eraseFav = (db) => async (shoeId,userId) => {
    try {
        const response = await db.query(deleteFav(shoeId,userId))
        return {
            ok: true,
            response: response.rows
        }
    } catch (error) {

        return {
            ok: false,
            message: error.message
        }

    }
}

module.exports={
    addFavourite,
    eraseFav
}