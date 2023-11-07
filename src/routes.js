const queries = require("./queries");
const service = require("./service");

const routes = (app) => {
    app.get('/', (req, res)=>{ 
        res.status(200); 
        res.send("Welcome to our project home page - CS 257"); 
    });

    app.get('/getAllUsers', async (req, res) => {
        res.status(200);
        let users = await queries.getAllUsers();
        res.send(users);
    });

    app.get('/getAllProducts', async (req, res) => {
        res.status(200);
        let products = await queries.getAllProducts();
        res.send(products);
    });

    app.get('/getAllSellers', async (req, res) => {
        res.status(200);
        let sellers = await queries.getAllSellers();
        res.send(sellers);
    });

    app.get('/getUserSellerJoinLevenshtein', async (req, res) => {
        try {
            res.status(200);
            let joined = await service.getUserSellerJoinLevenshtein("username", "username");
            res.send(joined);
        } catch(e) {
            res.status(500);
            console.log("Something went wrong during user and seller join: ", e);
            res.send();
        }
    });

    app.get('/getUserSellerJoinSoundex', async (req, res) => {
        try {
            res.status(200);
            let joined = await service.getUserSellerJoinSoundex("username", "username");
            res.send(joined);
        } catch(e) {
            res.status(500);
            console.log("Something went wrong during user and seller join: ", e);
            res.send();
        }
    });

    app.get('/getUserSellerJoinMetaphone', async (req, res) => {
        try {
            res.status(200);
            let joined = await service.getUserSellerJoinMetaphone("username", "username");
            res.send(joined);
        } catch(e) {
            res.status(500);
            console.log("Something went wrong during user and seller join: ", e);
            res.send();
        }
    });

};

module.exports = routes;
