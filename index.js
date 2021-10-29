if (process.env.NODE_ENV !== 'production')

require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require('./swagger.json');

const cors = require("cors");
const routes = require("./server/routes/index");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("*", (req, res) => {
  res.send("API Restaurante MagicBurger.");
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
