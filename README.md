# Immer-Safe

## Overview :-

Immer Safe is a fully-responsive web application designed using the MERN stack (MongoDB, Express.js, React.js, Node.js) to ensure the safety of users by monitoring fire hazards and providing timely alerts. This system integrates advanced fire sensor monitoring technology to detect potential fire incidents and deliver immediate notifications to users, enhancing safety measures.



## Steps to Run the App Locally :-
### 1. Clone the repository:
```
git clone https://github.com/GDGouravDey/Immer-Safe.git
cd immer-Safe
```
### 2. Configure environment variables:
```
Enter your MONGODB_URI, GEMINI API_KEY and TWILIO ACCOUNT DETAILS in the .env file
```
### 3. Run the Frontend
```
cd fire-app
npm i (Exclude this Step if node_modules is already downloaded)
npm run dev
```

### 4. Run the Backend Server :-
> Open another terminal and execute these commands
```
cd fire-app
npm i (Exclude this Step if node_modules is already downloaded)
npm start
```

## Testing Fire Alert

Use the following test account to sign in (for testing only):

```
Email: gdgouravdey@gmail.com
Password: 12345678
```

This project is dependent on a functioning hardware model with Arduino and ESP32. In absence of these, the website can be tested as :-
> Send a POST request as JSON to ```http://localhost:8000``` (For Local Server) or ```https://fire-app-tau.vercel.app/``` (For Deployed Server)

Example contents of Test JSON :-
```
{
  "data": {
    "AO1": "100",
    "DO1": "1",
    "AO2": "210",
    "DO2": "0"
  }
}
```
> AO1 and AO2 represent Fire Sensor values. Any value less than 200 implies Fire in the Room.


