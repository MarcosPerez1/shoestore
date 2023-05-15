const {newPurchase}=require("./queries")

const addPurchase = (db) => async (shoeId,userId) => {
    try {
        const response = await db.query(newPurchase(shoeId,userId))
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
    addPurchase
}