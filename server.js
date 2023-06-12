import dotenv from 'dotenv';
import app from './app.js';
import mongoose from 'mongoose';

dotenv.config();

// connecting mongoDB
mongoose.connect(process.env.DB).then(() => {
  console.log('DATABASE CONNECTED SUCCESSFULLY');
});

//creating server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`);
});
