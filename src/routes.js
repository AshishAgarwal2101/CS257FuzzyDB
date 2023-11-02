const queries = require("./queries");

const routes = (app) => {
    app.get('/', (req, res)=>{ 
        res.status(200); 
        res.send("Welcome to root URL of Server"); 
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
};

module.exports = routes;
