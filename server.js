const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000
const mongo_url = process.env.MONGODB_URL 

// Middlewares
app.use(express.json());

// Auth Endpoints
app.get('/api/v1/auth', )

//Mongodb Connection
mongoose.connect(mongo_url).then(() => app.listen(port, () => {
    console.log("MongoDB connected successfully"); 
    console.log(`Server started at ${port}`);
}))
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

