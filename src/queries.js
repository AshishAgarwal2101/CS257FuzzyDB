const util = require('util');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL Database.!");
});
const query = util.promisify(con.query.bind(con));

module.exports = {
    getAllUsers: async () => {
        let sql = "SELECT * FROM USER";
        return await query(sql);
    },
    getAllProducts: async () => {
        let sql = "SELECT * FROM PRODUCT";
        return await query(sql);
    },
    getAllProducts: async () => {
        let sql = "SELECT * FROM SELLER";
        return await query(sql);
    }
};
