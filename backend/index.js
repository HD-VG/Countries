import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { getCountrys } from './src/controller/map.controller.js';
import cors from 'cors'

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.get('/api/countries', getCountrys);
//pruba de que funciona el bakend
app.get('/', (req, res) => {
  res.send('API de Equilibri funcionando. Ve a /api/emissions para ver los datos.');
});

app.listen(5000, () => {
  console.log('Backend corriendo en http://localhost:5000');
});
export default app;