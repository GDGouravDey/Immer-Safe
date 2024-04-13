import { Schema, model } from "mongoose";

const sensorDataSchema = new Schema({
 // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },// Reference to the user who owns this sensor data
  a1: { type: Number, required: true },
  d1: { type: Number, required: true },
  a2: { type: Number, required: true },
  d22: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const SensorData = model('SensorData', sensorDataSchema);

export default SensorData;
