import * as express from "express";
import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";

const app = express();
const port = 3000;

const { DATABASE, USERNAME, PASSWORD, HOST, PORT } = configDotenv().parsed;

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  port: Number(PORT),
  dialect: 'postgres',
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post("/", (req, res) => {
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});