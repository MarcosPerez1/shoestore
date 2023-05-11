const { sql } = require("slonik")

const insertUser = (username, password, address, age, city, email) => sql.unsafe`
INSERT INTO users (
    username,password,age,email,address,city
) VALUES (
    ${username},${password},${age},${email},${address},${city}
)
`

const selectByUser = (username) => sql.unsafe`
SELECT username, password
FROM users
WHERE username LIKE ${username};
`

module.exports = {
    insertUser,
    selectByUser
}