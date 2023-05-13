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
const sizeRange = (minSize, maxSize) => sql.unsafe`
SELECT brand, model, size
FROM shoes
WHERE size BETWEEN ${minSize} AND ${maxSize}
`;

const addShoe =(brand,size,color,model)=>sql.unsafe`
INSERT INTO shoes (brand,size,color,model)
VALUES (${brand},${size},${color},${model})
`
const changeShoe = (id,brand,size,color,model)=>sql.unsafe`
UPDATE shoes
SET brand=${brand},size=${size},color=${color},model=${model}
WHERE id=${id}
`

module.exports={
    allShoes,
    shoeByBrand,
    searchSize,
    sizeRange,
    addShoe,
    changeShoe
}