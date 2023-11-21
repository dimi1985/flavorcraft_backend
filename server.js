const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors'); 
const bodyParser = require('body-parser');

const express = require('express');
const serverless = require('serverless-http');


const app = express();

// Middleware for parsing JSON
app.use(express.json());


// Middleware for CORS
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

mongoose.connect('mongodb+srv://root:Svr9QXnKOYroT9qB@rest-recipe-api-db.cfupl.mongodb.net/flavorcraft',);


// Use auth routes
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports.handler = serverless(app);