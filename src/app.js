const express = require("express");
const cors = require("cors");
const picoPlacaRoutes = require("./routes/picoPlacaRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", picoPlacaRoutes);

module.exports = app;
