import cookieParser from 'cookie-parser';
import cors from 'cors';
import dbConnect from './dbconnect.mjs';
import registerrouter from './routes/register.route.mjs'
import loginrouter from './routes/login.route.mjs'
import dotenv from 'dotenv';
import express, { urlencoded, json } from 'express';
import twilio from 'twilio';
import SensorData from './models/sensor.mjs';

console.log(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN, process.env.TWILIO_PHONE_NUM);
const accountSid = process.env.TWILIO_SID || '';
const authToken = process.env.TWILIO_AUTH_TOKEN || '';
const phone = process.env.TWILIO_PHONE_NUM || '';
const client = twilio(accountSid, authToken);

var room;
var room_number;
var lastFireTime = null;
var lastRoomNumber = null;
let name = '', mail = '', phone_number = '';

const port = 8000; // process.env.port 
const app = express();
app.use(cors({
  // origin: process.env.CORS_ORIGIN, 
  credentials: true
}))
console.log("hello from server.js")
dbConnect()
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())


app.use('/', loginrouter);
app.use('/', registerrouter);

// Define a route for handling GET requests to /sensorData
app.post('/backend-route', (req, res) => {
  const { username, email, phone_num } = req.body;
  console.log('Received username:', username);
  console.log('Received email:', email);
  console.log('Received phone number:', phone_num);
  name = username;
  mail = email;
  phone_number = phone_num;
  res.send('User Details received successfully');
});
app.get('/getNotif', async (req, res) => {
  try {
    const sensorData = await SensorData.find();
    res.status(200).json(sensorData);
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    res.status(500).send('Internal server error');
  }
});
app.post('/', async (req, res) => {
  try {
    console.log("the request is");
    console.log(req.body); // Log the request body directly

    const requestData = req.body; // No need to parse req.body
    console.log(requestData);

    // Extract AO and DO values from the parsed data
    const AO1 = requestData.data.AO1;
    const DO1 = requestData.data.DO1;
    const AO2 = requestData.data.AO2;
    const DO2 = requestData.data.DO2;
    // Extract AO and DO values for Sensor 1
    const aoValue1 = parseInt(AO1);
    const doValue1 = parseInt(DO1);
    const aoValue2 = parseInt(AO2);
    const doValue2 = parseInt(DO2);

    console.log("Sensor 1 - AO Value:", aoValue1);
    console.log("Sensor 1 - DO Value:", doValue1);
    console.log("Sensor 2 - AO Value:", aoValue2);
    console.log("Sensor 2 - DO Value:", doValue2);

    let room;

    if (aoValue1 < 200 || aoValue2 < 200) {
      const sensorData = new SensorData({
        a1: aoValue1,
        d1: doValue1,
        a2: aoValue2,
        d22: doValue2
      });

      // Determine the room based on the sensor values
      room = aoValue1 < 200 ? aoValue1 : aoValue2;
      room_number = aoValue1 < 200 ? 1 : 2;
      const currentTime = new Date();
      // Send SMS if the room value is below 200 and the SMS hasn't been sent yet
      if (room < 200 && (lastRoomNumber === null || room_number != lastRoomNumber || lastFireTime === null || currentTime - lastFireTime >= 60000)) {
        await sensorData.save();
        console.log('Sensor data saved successfully');
        res.status(200).send('Sensor data saved successfully');
        sendSMS(room);
        lastFireTime = currentTime;
        lastRoomNumber = room_number;
      }
    } else {
      console.log('Sensor data not saved');
      res.status(200).send('Sensor data not saved');
    }
  } catch (error) {
    console.error('Error saving sensor data:', error);
    res.status(500).send('Internal server error');
  }
});


// Start the server
function sendSMS(room) {
  client.messages
    .create({
      body: 'Fire detected! Sensor values exceeded 500. ',
      from: '+12513579623',
      to: '+917439491785'
    })
    .then(message => console.log('SMS sent:', message.sid))
    .catch(error => console.error('Error sending SMS:', error));
  client.calls
    .create({
      twiml: '<Response><Say voice="alice">Fire Alert. There is a possible fire in your building.</Say></Response>',
      from: '+12513579623',
      to: '+917439491785'
    })
    .then(call => console.log(call.sid));
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
export default app;