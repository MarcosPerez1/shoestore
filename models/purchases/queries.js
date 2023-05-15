const {sql}=require("slonik")

const newPurchase =(shoeId,userId)=>sql.unsafe`
INSERT INTO products_clients (shoe_id, user_id)
VALUES (${shoeId}, ${userId});

`
module.exports={
    newPurchase
}