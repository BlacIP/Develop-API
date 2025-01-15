const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const professionalRouter = require('./routes/professional');  
require('dotenv').config();
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use('/professional', professionalRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
      message: 'Something went wrong!',
      error: err.message
  });
});

mongodb.initDb((err) => {
  if (err) {
      console.error('Database connection failed:', err);
  } else {
      app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
          console.log('Database connected');
      });
  }
});