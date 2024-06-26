const express = require('express');
var cors = require('cors')

const app = express(); 
const PORT = 3001; 
  
app.listen(PORT, (error) =>{ 
    if(!error) {
        console.log("Server is Successfully Running,  and App is listening on port "+ PORT) 
    }
    else {
        console.log("Error occurred, server can't start", error); 
    }
});

app.use(cors());
app.use(express.static('frontend/build'));
const apiRouter = express.Router();
app.use("/api", apiRouter);

require("./routes")(apiRouter);