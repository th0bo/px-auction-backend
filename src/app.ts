import * as express from "express";
import { Sequelize, QueryTypes } from "sequelize";
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

app.get('/api/pixels', async (req, res) => {
  const results = ((await sequelize.query(`select color from public."Pixel"`, { type: QueryTypes.SELECT })) as Array<{ color: string }>).map(({ color }) => color);
  const order = Math.round(Math.sqrt(results.length));
  const board = Array.from({ length: order }).map((_v, y) => results.slice(y * order, (y + 1) * order));
  res.send(board);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});