require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");

const app = express();

connectDB();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

app.use("/api", require("./routes/contactRoutes.js"));
app.use("/api", require("./routes/sessionRoutes.js"));
app.use("/api", require("./routes/authRoutes.js"));

app.listen(process.env.PORT, '0.0.0.0', () =>
  console.log(`Server running on port ${process.env.PORT}`)
);