const queries = require("./queries");
const service = require("./service");
const { Parser } = require("node-sql-parser");
const bodyParser = require('body-parser');
const parser = new Parser();

const routes = (app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.raw());

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

    app.post('/isSimilar', async (req, res) => {
        let result = service.isSimilar(req.body.algorithm, req.body.left, req.body.right);
        res.status(200);
        res.send(result);
    });

    app.post("/search", async (req, res) => {
        try {
            let searchStr = req.body.searchStr;
            let result = await service.searchTables(searchStr);
            res.status(200);
            res.send(result);
        } catch (e) {
            res.status(500);
            console.log("Something went wrong during user and seller join: ", e);
            res.send();
        }
    });

    app.post('/queryJoin', async (req, res) => {
        try {
            let sql = req.body.statement;
            let algorithm = req.body.algorithm;
            let queryResponse = await service.executeQueryWithJoin(sql, algorithm);
            res.status(200);
            res.send(queryResponse);
        } catch (e) {
            res.status(500);
            console.log("Something went wrong during user and seller join: ", e);
            res.send();
        }
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

    app.get('/getUserSellerJoinCosineSimilarity', async (req, res) => {
        try {
            res.status(200);
            let joined = await service.getUserSellerJoinCosineSimilarity("username", "username");
            res.send(joined);
        } catch(e) {
            res.status(500);
            console.log("Something went wrong during user and seller join: ", e);
            res.send();
        }
    });

    app.post("/execQuery", async (req, res) => {
        console.log("Req body: ", req.body);
        let ast = parser.astify(req.body.statement);
        res.status(200);
        res.send(ast);
    });

};

module.exports = routes;
