const {getAllUsers}=require("./queries")

const allUsers = (db) =>async ()=>{
    try {
        const response = await db.query(getAllUsers())

        return{
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
    allUsers
}