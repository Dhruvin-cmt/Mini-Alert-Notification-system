import mongoose from "mongoose";

export const dbConnection = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Database is connected to mongoose atlas"))
    .catch((err) => {
      throw new Error("error occur during database connection", err);
    });
};
