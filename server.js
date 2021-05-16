import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import categorieRoute from './routes/categorieRoute.js';
import searchRoute from './routes/searchRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//connect to mongodb
mongoose.connect(process.env.PORT
, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true}).catch(error => console.log);

const app = express();

app.use(bodyParser.json());

//define routes for different type of paths
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/categories", categorieRoute);
app.use("/api/search", searchRoute);

// Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


//start server
app.listen(process.env.PORT || 5000, () => {console.log("Server stateds")});


