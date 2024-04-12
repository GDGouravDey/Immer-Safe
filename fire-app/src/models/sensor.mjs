// import { Schema, model } from "mongoose";
// import User from './user.mjs';
// const sensorDataSchema = new Schema({
//   user: { type: Schema.Types.ObjectId, ref: 'User' },// Reference to the user who owns this sensor data
//   value: { type: Number, required: true }, // Sensor value
//   timestamp: { type: Date, default: Date.now } // Timestamp of when the sensor data was received
// });

// const SensorData = model('SensorData', sensorDataSchema);

// export default SensorData;
import { Schema, model } from "mongoose";

const sensorDataSchema = new Schema({
 // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },// Reference to the user who owns this sensor data
  a1: { type: Number, required: true }, // Sensor value
  d1: { type: Number, required: true },
  a2: { type: Number, required: true }, // Sensor value
  d22: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now } // Timestamp of when the sensor data was received
});

const SensorData = model('SensorData', sensorDataSchema);

export default SensorData;
