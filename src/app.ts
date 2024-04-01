import express from "express";
import { Sequelize, QueryTypes } from "sequelize";
import { configDotenv } from "dotenv";
import { init as initPixel, Pixel } from "./pixel";
import { init as initUser, User } from "./user";

const app = express();
const port = 3000;

const { DATABASE, USERNAME, PASSWORD, HOST, PORT } = configDotenv().parsed;

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  port: Number(PORT),
  dialect: 'postgres',
  define: {
    freezeTableName: true,
    timestamps: false,
  }
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).then(() => {
  initPixel(sequelize);
  initUser(sequelize);
}).then(() => {
  // sequelize.sync();
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});



app.get('/', async (req, res) => {

  // res.send((await User.findAll()).map((userDao) => userDao.toJSON()));
  res.send('Hello World!');
});

app.get('/api/pixels', async (req, res) => {
  const results = (await Pixel.findAll()).map((pixel) => pixel.get("color") as string);
  // const results = ((await sequelize.query(`select color from public."Pixel"`, { type: QueryTypes.SELECT })) as Array<{ color: string }>).map(({ color }) => color);
  const order = Math.round(Math.sqrt(results.length));
  const board = Array.from({ length: order }).map((_v, y) => results.slice(y * order, (y + 1) * order));
  res.send(board);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});