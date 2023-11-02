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
};

module.exports = routes;
