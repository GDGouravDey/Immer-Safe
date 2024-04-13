import dotenv from 'dotenv';
import express, { urlencoded, json } from 'express';
import twilio from 'twilio';
const app = express();
const port = 3000;
import connectDB from './dbconnect.mjs';
//const sensorDataRouter = require('./routes/sensorDataRouter');
import SensorData from './models/sensor.mjs';
import cors from 'cors';
console.log("connecting to database");
connectDB();
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

var room;
var room_number;
var lastFireTime = null;
var lastRoomNumber = null;
// Start the server
console.log(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN, process.env.TWILIO_PHONE_NUM);
const accountSid = process.env.TWILIO_SID || '';
const authToken = process.env.TWILIO_AUTH_TOKEN || '';
const phone = process.env.TWILIO_PHONE_NUM || '';
const client = twilio(accountSid, authToken);
//console.log(client)
let name='', mail='', phone_number='';
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
      body: 'Fire detected! Sensor values exceeded 500.',
      from: '+12513579623',
      to: '+917439491785'
    })
    .then(message => console.log('SMS sent:', message.sid))
    .catch(error => console.error('Error sending SMS:', error));
}
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

