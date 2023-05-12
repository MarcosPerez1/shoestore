const {slk}=require("slonik")

const allShoes = () => sql.unsafe`
SELECT *
FROM shoes`

module.exports={
    allShoes
}