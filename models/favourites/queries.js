const {sql}=require("slonik")

const newFavourite =({user_id,shoe_id})=>sql.unsafe`
INSERT INTO favourite_products (user_id, shoe_id)
VALUES (${user_id}, ${shoe_id});
`
const deleteFav = ({user_id,shoe_id}) =>sql.unsafe`
DELETE FROM favourite_products
WHERE user_id = ${user_id} AND shoe_id = ${shoe_id};
`


module.exports={
    newFavourite,
    deleteFav
}