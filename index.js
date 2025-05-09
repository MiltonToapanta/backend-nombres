const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  host: 'db',
  user: 'postgres',
  password: 'postgres',
  database: 'nombres',
  port: 5432
});

app.post("/nombres", async (req, res) => {
  const { nombre } = req.body;
  await pool.query("INSERT INTO nombres (nombre) VALUES ($1)", [nombre]);
  res.send({ message: "Nombre guardado" });
});

app.get("/nombres", async (req, res) => {
  const result = await pool.query("SELECT * FROM nombres");
  res.send(result.rows);
});

app.listen(3000, () => console.log("Backend corriendo en puerto 3000"));
