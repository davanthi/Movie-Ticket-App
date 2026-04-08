const express = require("express");
const cors = require("cors");
const dbConnection = require("./dbConfig.js");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

dbConnection.connectDB();
const userRoutes = require("./routes/user.route.js");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use("/api/auth", userRoutes);

app.listen(8002, () => {
  console.log("server started on port 8002");
});
