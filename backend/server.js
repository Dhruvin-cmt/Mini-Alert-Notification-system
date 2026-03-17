import app from "./app.js";
import { dbConnection } from "./database/dbConnection.js";

dbConnection();

app.listen(process.env.PORT, (req, res) => {
  console.log(`App is listerning on ${process.env.PORT}`);
});
