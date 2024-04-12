import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const dbConnect = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  mongoose.connection.on("connected", () => {
    console.log("Connected to the Database successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.error(`Error while connecting to the Database. \n${err}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from the Database");
  });
};
export default dbConnect;