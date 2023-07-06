import express, { Request, Response } from 'express';
import { Pool, QueryResult } from 'pg';
import { json } from 'body-parser';

const app = express();
const port = 3000;

//sql alap
const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432, // or your PostgreSQL port number
});

//mondjuk ha vissza akarod addni az összes usert egy get re (!!!ilyet ne)
app.get('/users', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result: QueryResult = await client.query('SELECT * FROM users');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//arrow function 
// const alma = (a: number, b: number): number => {
//   return a + b;
// };


// let res = alma(5, 6);


//const === constans változo
//let === változo
//var === változo (nem használjuk) elavult szar!!!



// mivel rest api igy nem kell paget vissza küldeni

// HTTP GET req '/' route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
  // JSON.stringify() - stringgé alakítja az objektumot
  // res.send(JSON.stringify({alma: 5}))
});

app.post('/alma', (req: Request, res: Response) => {
  let alma = req.body;
  console.log(alma);
});

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
