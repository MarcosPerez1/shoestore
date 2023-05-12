const { allShoes, shoeByBrand, searchSize} = require("./queries")


const getAll = (db) => async () => {
    try {
        const response = await db.query(allShoes())
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

const shoesBrand = (db) => async (brand) => {
    try {
        const response = await db.query(shoeByBrand(brand))
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

const shoeSize = (db)=> async (size)=>{
    try {
        const response = await db.query(searchSize(size))
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


module.exports = {
    getAll,
    shoesBrand,
    shoeSize
}