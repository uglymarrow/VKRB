const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongo db connection established successfully");
})

const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');

app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});