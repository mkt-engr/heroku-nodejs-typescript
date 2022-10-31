import express, { Request, Response } from "express";
import { Client } from "pg";
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
  client.query("SELECT * FROM articles;", (err, response) => {
    if (err) throw err;
    a = response.rows[0].title;
    console.log(a);
    for (let row of response.rows) {
      //   console.log(JSON.stringify(row));
    }

    client.end();
  });

  res.status(200).send({
    message: a,
  });
});

export { router as connectPostgressTest01Router };
