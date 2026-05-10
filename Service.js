require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/contactRoutes.js"));
app.use("/api", require("./routes/sessionRoutes.js"));
app.use("/api", require("./routes/authRoutes.js"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);