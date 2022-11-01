import express, { Request, Response } from "express";
import { Client, Pool } from "pg";
const router = express.Router();

router.get("/connectdbtest", async (req: Request, res: Response) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  try {
    client.connect();
  } catch (error) {
    console.error(error);
  }
  let a;

  const b = await client.query("SELECT * FROM articles;");
  const c = b.rows;
  console.log({ c });
  client.query("SELECT * FROM articles;", (err, response) => {
    //   client.query("SELECT NOW();", (err, response) => {
    if (err) throw err;
    // a = response.rows[0].title;ß
    a = response.rows[0];
    console.log(a);
    for (let row of response.rows) {
      //   console.log(JSON.stringify(row));
    }
    res.status(200).json({
      message: a,
    });
    client.end();
  });

  //   res.status(200).json({
  //     message: a,
  //   });
});

export { router as connectPostgressTest01Router };
