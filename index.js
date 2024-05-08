import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import open from 'open';

var log = console.log; 

const app = express();
const port = 3000;
let log = console.log;

const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: "password",
  database: "toDoList",
  port: 5432
});


// Middleware
db.connect();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {


  res.render('index.ejs');

})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  open(`http://localhost:${port}`);
});
