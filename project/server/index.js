const express = require("express");
const dbConnection = require("./dbConfig.js");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

dbConnection.connectDB();
const userRoutes = require("./routes/user.route.js");
app.use(express.json());
app.use("/api/auth", userRoutes);

app.listen(8002, () => {
  console.log("server started on port 8002");
});
