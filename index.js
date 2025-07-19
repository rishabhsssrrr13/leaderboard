const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

const app = express();

// CORS for Netlify frontend (adjust as needed)
app.use(cors({
  origin: '*',  // or replace with Netlify link for security
  methods: ['GET', 'POST'],
}));

app.use(express.json());

app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('🎉 API is running successfully...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
