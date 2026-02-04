// Create HTTP Server
// import express module
import express from 'express'
import { userApp } from './APIs/UserAPI.js';
import { productApp } from './APIs/ProductAPI.js';
// create server
const app = express();
// assign the port number to the server
app.listen(3000,()=> console.log('HTTP server listening on the port 3000'));


// body parsing middleware
app.use(express.json()); 

// forward req to userApp when path starts 
app.use('/user-api',userApp)

app.use('/product-api',productApp);