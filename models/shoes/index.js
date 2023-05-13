const { allShoes, shoeByBrand, searchSize, sizeRange, addShoe ,changeShoe  } = require("./queries")


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

const sizeShoeRange = (db)=> async (minSize, maxSize)=>{
    try {
        const response = await db.query(sizeRange(minSize, maxSize))
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

const newShoe =(db)=>async ({brand,size,color,model})=>{
    try {
        const response = await db.query(addShoe(brand,size,color,model))
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

const modifyShoe =(db)=>async (id,brand,size,color,model)=>{
    try {
        const response = await db.query(changeShoe(id,brand,size,color,model))
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
    shoeSize,
    sizeShoeRange,
    newShoe,
    modifyShoe
}