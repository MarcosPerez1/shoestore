const {sql}=require("slonik")

const getAllUsers = () =>sql.unsafe`
SELECT *
FROM users
`

module.exports={
    getAllUsers
}