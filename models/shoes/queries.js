const {sql}=require("slonik")

const allShoes = () => sql.unsafe`
SELECT *
FROM shoes`

const shoeByBrand = (brand) =>sql.unsafe`
SELECT brand, model
FROM shoes
WHERE brand LIKE ${brand}
`
const searchSize = (size)=>sql.unsafe`
SELECT brand,model,size
FROM shoes
WHERE size = ${size}
`

module.exports={
    allShoes,
    shoeByBrand,
    searchSize
}