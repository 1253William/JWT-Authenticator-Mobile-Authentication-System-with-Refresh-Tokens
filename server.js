const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth.route');

const app = express();
const port = process.env.PORT || 4000
const mongo_url = process.env.MONGODB_URL 

// Middlewares
app.use(express.json());
app.use(cors())

const allowedOrigins = ["http://localhost:8080"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin); // Reflect the origin in the Access-Control-Allow-Origin header
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Auth Endpoints
app.use('/api/v1/auth', authRoutes )

app.post('/', (req, res)=>{
    res.send('Hello World!');
})
//Mongodb Connection
mongoose.connect(mongo_url).then(() => app.listen(port, () => {
    console.log("MongoDB connected successfully"); 
    console.log(`Server started at ${port}`);
}))
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

