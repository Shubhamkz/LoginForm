const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const connectDB = require("./config/connectdb");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/user", userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
