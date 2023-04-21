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
   // Update event tenure every minute
})


const eventsRouter = require('./routes/events');

// .then(() => {
//     console.log('Connected to MongoDB');
//     // Start event tenure update process
//     setInterval(() => {
//       const Event = require('./models/event.model');
//       Event.updateEventTenure((error, result) => {
//         if (error) {
//           console.error('Failed to update event tenure:', error);
//         } else {
//           console.log('Event tenure updated:', result);
//         }
//       });
//     }, 60000); // Update event tenure every minute
//   })
//   .catch(error => {
//     console.error('Failed to connect to MongoDB:', error);
//   });

app.use('/eventsg', eventsRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
