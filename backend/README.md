# Backend

# Creating a Server
1. Open the terminal
2. Create a new folder => *mkdir name*
3. Inside the new folder run => *npm init*
    - edit the prompts as needed (most are as is)
    - edit the description
    - edit entry point to server.js
4. Create server.js file => *touch server.js*
5. Open VS Code
6. Install express => *npm install express*
    - make sure the dependency shows up in the package.json
7. In server.js
 ```
//In a server, we use require instead of import
const express = require('express');
const app = express();

//Specify what route our server should be listening for
app.get('/', (request, response)=>{
    //when we get that request, send back a response
    response.send('hello from the server');
});

//Tell the server to start listening for requests
app.listen(3001, ()=>{console.log('listening on port 3001')});

 ```

8. Now go into your browser and check localhost:3001
9. Add a .gitignore:  https://github.com/mirmsilva/city-explorer-api/blob/main/.gitignore
10. In the terminal install dotenv => *npm install dotenv*
11. Create a .env file and add PORT=3001
12. In server.js add:
```
//Use dotenv to acess our .env file. Require should be the BEFORE the const
require('dotenv').config();
const PORT = process.env.PORT;
```

13. In server.js change the app.listen to PORT
```
app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});
```

## At This Point Your server.js should look like this:
```
console.log ('hello from node!')

//In a server, we use require instead of import
const express = require('express');
const app = express();

//Use dotenv to acess our .env file. Require should be the BEFORE the const
require('dotenv').config();
const PORT = process.env.PORT;

//Specify what route our server should be listening for
app.get('/', (request, response)=>{
    //when we get that request, send back a response
    response.send('hello from the server');
});

//Tell the server to start listening for requests
app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});
```

## Adding Query Parameters
1. Create a new route
2. Access the query params by using request.query
```
app.get('/myName', (request, response)=>{
    let name = request.query.name;
    response.send(`Your name is ${name}`);
});
```
3. To access from URL => http://localhost:3001/myName?name=Miriam
    - myName is our new route and it is looking for a parameter
    - After the route add a ? then the parameter
    - The name of the param must match your code in the URL

## Adding Auth
1. In terminal => *npm install --save express-oauth2-jwt-bearer *
2. In terminal => *npm install --save jwks-rsa *
3. In terminal => *npm install jsonwebtoken *
4. In server.js
```
const jwt = require ('jsonwebtoken');
const jwksClient = require ('jwks-rsa');

// this function comes directly from the jasonwebtoken docs
const client = jwksClient ({
  // this url comes from your app on the auth0 dashboard
  jwksUri: 'YOUR URI GOES HERE',
});

const PORT = process.env.PORT || 3001;

// this function comes directly from the jasonwebtoken docs
function getKey (header, callback) {
  client.getSigningKey (header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback (null, signingKey);
  });
}

```
The URI can be found in the documentation under Applicaations > DefaultApp > Advanced Settings > Endpoints > JSON Web Key Set

## Adding MongoDb
1. In terminal => *npm install mongoose*
2. In terminal => *npm install brew services start mongodb-community@5.0*
3. In terminal => *mongosh*
4. In server.js insert the following lines of code:
```
const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/BookAPI`, {useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected!!');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

```

## Things to remember
- you have to save and restart the server to make the server is updating
    - to stop it from running => *Control+C*
- Push up to empty GitHub Repo



## Stuff I used:
### Mongo
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

### Auth0
- https://auth0.com/docs/quickstart/backend/nodejs

### Gitignore
- https://www.toptal.com/developers/gitignore/api/node,macos,linux,windows,webstorm,visualstudiocode

### Nodemon for Restarting the Server Quickly
- https://stackoverflow.com/questions/1972242/how-to-auto-reload-files-in-node-js


