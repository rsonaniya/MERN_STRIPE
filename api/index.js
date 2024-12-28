const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const paymentsRoute = require("./routes/paymentsRoute");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use("/api/payments/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

app.use("/api/payments", paymentsRoute);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
