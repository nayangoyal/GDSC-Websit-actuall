const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express()
const port = process.env.PORT || 8000

app.use(cors());
app.use(express.json())

const uri = process.env.EVENT_URI;
mongoose.connect(uri, {useNewUrlParser: true,
useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', ()=>{
  console.log("MongoDB database connection established successfully");
})


const eventsRouter = require('./routes/events');

app.use('/eventsg', eventsRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
