//Express
const express = require('express');
const app = express();

//Dotenve
require('dotenv').config();
const PORT = process.env.PORT;

//Routes
app.get('/', (request, response)=>{
    response.send('hello from the server');
});

app.get('/petName', (request, response)=>{
    let name = request.query.name;
    response.send(`Your pet's name is ${name}`);
});

app.listen(PORT, ()=> {console.log(`listening on port ${PORT}`)});