const {allShoes}=require("./queries")


const getAll =(db)=> async () =>{
    try {
        const response = await db.query(allShoes())
        return {
            ok:true,
            response:response.rows
        }
    } catch (error) {

        return{
            ok:false,
            message:error.message
        }
        
    }
}

module.exports={
    getAll
}