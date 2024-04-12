import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dbConnect from './dbconnect.mjs';
import registerrouter from './routes/register.route.mjs'
import loginrouter from './routes/login.route.mjs'
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
export default app;