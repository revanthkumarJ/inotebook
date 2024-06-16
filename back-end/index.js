const express = require('express');
const router = require("./routes/user.js");
const connectToMongo = require("./db.js");
const notesRouter=require("./routes/notes.js")

const app = express();
const port = 5000;

connectToMongo();

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World By Revanth!');
});



app.use('/auth',router)
app.use('/notes',notesRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
