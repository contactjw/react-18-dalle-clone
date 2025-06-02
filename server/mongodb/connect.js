import mongoose from 'mongoose';

const connectDB = (url) => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(url)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => {
      console.error('failed to connect to MongoDB');
      console.error(err);
    });
};

export default connectDB;
