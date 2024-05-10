import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import open from 'open';

const app = express();
const port = 3000;
let log = console.log;

const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: "password",
  database: "streak",
  port: 5432
});


// Middleware
db.connect();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var selectedActivityId = 1;
var selectedActivityName = ""; 


app.get("/", async (req, res) => {
  const checkStreakActivityQuery = "select * from activity"; 
  const checkStreakActivityResult = await db.query(checkStreakActivityQuery); 
  const activityList = checkStreakActivityResult.rows; 
  log(activityList); 
    // Query to check if the streak for the selectedActivityId already exisits
    const checkStreakQuery = "SELECT start_date, end_date from streak where activity_id = $1";
    const checkStreakResult = await db.query(checkStreakQuery, [selectedActivityId]);
    if(checkStreakResult.rows.length!==0){
      const startDate = checkStreakResult.rows[0].start_date.toDateString(); 
      const endDate = checkStreakResult.rows[0].end_date.toDateString(); 
    
      res.render('index.ejs', {activityList: activityList,startDate: startDate, endDate: endDate, selectedActivityName:selectedActivityName});
    }else{
      res.render('index.ejs', {activityList: activityList, selectedActivityName:selectedActivityName});
    }
  
})

app.post("/add", async (req, res) => {

  try {
    let { selectedDate } = req.body;
    log(selectedDate);
    log(req.body)

    // Convert selectedDate to a Date object
    selectedDate = new Date(selectedDate);

    // Query to check if the streak for the selectedActivityId already exisits
    const checkStreakQuery = "SELECT * from streak where activity_id = $1";
    const checkStreakResult = await db.query(checkStreakQuery, [selectedActivityId]);

    if (checkStreakResult.rows.length === 0) {
      // Insert a streak if it already doesn't exist
      const insertStreakQuery = "INSERT into streak (activity_id, start_date, end_date) values ($1, $2, $2)";
      const insertStreakResult = await db.query(insertStreakQuery, [selectedActivityId, selectedDate]);
      // Log insertion result if needed
    } else {
      log(checkStreakResult.rows[0].end_date);
      const currEndDate = checkStreakResult.rows[0].end_date;

      // Convert selectedDate and currEndDate to Date objects
      const selectedDateObj = new Date(selectedDate);
      const currEndDateObj = new Date(currEndDate);

      // Increment currEndDate by one day
      currEndDateObj.setDate(currEndDateObj.getDate() + 1);

      // Check if selectedDate is one day after currEndDate
      if (selectedDateObj.getTime() === currEndDateObj.getTime()) {
        // Update end date of the streak
        log("hello"); 
        const updateStreakQuery = "UPDATE streak SET end_date = $1 WHERE activity_id = $2";
        const updateStreakResult = await db.query(updateStreakQuery, [selectedDate, selectedActivityId]);
      }

    }
    // res.sendStatus(200); // Send success response
    res.redirect("/"); 
  } catch (error) {
    console.error("Error occurred:", error);
    res.sendStatus(500); // Send error response
  }
})

app.post("/selectActivity", async (req, res) =>{
  log(req.body); 
  let selectedActivity = req.body.activities; 
  let newActivity = req.body.newActivity; 
  if(newActivity!==''){
    const insertNewActivityQuery = "insert into activity (activity) values ($1)"; 
    const insertNewActivityResult = await db.query(insertNewActivityQuery, [newActivity]);
    selectedActivity = newActivity; 
  }
    const updateCurrentActivityQuery = "select id from activity where activity = $1"; 
    const updateCurrentActivityResult = await db.query(updateCurrentActivityQuery, [selectedActivity]); 
    selectedActivityId = updateCurrentActivityResult.rows[0].id; 
    selectedActivityName = selectedActivity; 
    log("Activity: " + selectedActivityName); 
  res.redirect("/");
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  // open(`http://localhost:${port}`);
});
