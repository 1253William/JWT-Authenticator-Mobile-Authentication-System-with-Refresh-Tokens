const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000
const mongo_url = process.env.MONGODB_URL 

app.use(express.json());

app.get('/api/v1/auth', )
mongoose.connect(mongo_url).then(() => app.listen(port, () => {
    console.log("MongoDB connected"); 
    console.log(`Server started at ${port}`);
}))
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

