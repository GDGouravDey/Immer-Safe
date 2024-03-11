import mongoose from 'mongoose';

const dbConnect = async () => {
  await mongoose.connect("mongodb+srv://trishasengupta27:trishasengupta27@project.gcrklcf.mongodb.net");

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