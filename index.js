const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();

const port = process.env.PORT;

// initialize express
const app = express();

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({extended : false}));


// Set static folder
// __dirname is a special variable in Node.js that represents the directory name of the current module.
app.use(express.static(path.join(__dirname, 'public')));


app.use('/openai', require('./routes/openaiRoutes'));

app.listen(port, ()=> {
    console.log(`Your app is running in http://localhost:${port}`);
})