#include <WiFi.h>
#include <WebServer.h>
#define AO_PIN_1 32  // ESP32's pin GPIO32 connected to AO pin of the first flame sensor
#define DO_PIN_1 13  

#define AO_PIN_2 33  // ESP32's pin GPIO33 connected to AO pin of the second flame sensor
#define DO_PIN_2 14 
#define  ssid "YOUR_WIFI_SSID"
#define password "YOUR_WIFI_PASSWORD"
#define LedPin 2
#define RXp2 16
#define TXp2 17

IPAddress local_ip(192, 168, 1, 1);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);
WebServer server(80);

int infrared_value_1 = 5;
int  flame_state_1= 5;
int infrared_value_2 = 5;
int  flame_state_2= 5;
bool LEDStatus = LOW;
String serial2Value = "N/A";  // Initialize with a default value
int lastDistance = -1;  // Initialize with a value that is not a valid distance
unsigned long previousMillis = 0;
const long interval = 1000;  // Interval in milliseconds

void setup() {
  Serial.begin(115200);
  Serial.begin(9600);
 
  // Set pinMode for the first flame sensor
  pinMode(DO_PIN_1, INPUT);

  // Set pinMode for the second flame sensor
  pinMode(DO_PIN_2, INPUT);
  WiFi.begin(ssid , password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  Serial2.begin(9600, SERIAL_8N1, RXp2, TXp2);
  pinMode(LedPin, OUTPUT);

  WiFi.softAP(ssid, password);
  WiFi.softAPConfig(local_ip, gateway, subnet);
  delay(1000);

  server.on("/", HTTP_GET, handle_OnConnect);
  server.on("/data", HTTP_GET, handle_getData);
  server.onNotFound(handle_NotFound);
  server.begin();
  Serial.println("HTTP Server Started");
  Serial.println(WiFi.localIP());
}

void loop() {
 
 infrared_value_1 = analogRead(AO_PIN_1);
   flame_state_1 = digitalRead(DO_PIN_1);
   Serial.println(flame_state_1);
    server.handleClient();
   if (flame_state_1 == HIGH)
   {
    Serial.println("No flame dected => The fire is NOT detected and the state is ");
    Serial.println(flame_state_1);
   }
  else{
    Serial.println("Flame dected => The fire is detected");
    Serial.println(flame_state_1);
  }
  Serial.print("The AO value: ");
  Serial.println(infrared_value_1);


 infrared_value_2 = analogRead(AO_PIN_2);
   flame_state_2 = digitalRead(DO_PIN_2);
   Serial.println(flame_state_2);
    server.handleClient();
   if (flame_state_2 == HIGH)
   {
    Serial.println("No flame detected => The fire is NOT detected and the state is ");
    Serial.println(flame_state_2);
   }
  else{
    Serial.println("Flame detected => The fire is detected");
    Serial.println(flame_state_2);
  }
  Serial.print("The AO value: ");
  Serial.println(infrared_value_2);
}
String getHTML() {
  String htmlcode = "<!DOCTYPE html> <html>\n";
  htmlcode += "<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no\">\n";
  htmlcode += "<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.7.2/css/all.css\"\n";
  htmlcode += "integrity=\"sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr\" crossorigin=\"anonymous\">\n";
  htmlcode += "<style>\n";
  htmlcode += "    body {\n";
  htmlcode += "        font-family: Arial, sans-serif;\n";
  htmlcode += "        display: flex;\n";
  htmlcode += "        flex-direction: column;\n";
  htmlcode += "        align-items: center;\n";
  htmlcode += "        justify-content: center;\n";
  htmlcode += "        margin: 0;\n";
  htmlcode += "        text-align: center;\n";
  htmlcode += "        background-color: #f4f4f4;\n";
  htmlcode += "        color: #333;\n";
  htmlcode += "    }\n";
  htmlcode += "    h1 {\n";
  htmlcode += "        font-size: 2.2rem;\n";
  htmlcode += "        margin-bottom: 10px;\n";
  htmlcode += "    }\n";
  htmlcode += "    h3 {\n";
  htmlcode += "        font-size: 1.3rem;\n";
  htmlcode += "        margin-bottom: 20px;\n";
  htmlcode += "    }\n";
  htmlcode += "    #distance {\n";
  htmlcode += "        font-size: 2.2rem;\n";
  htmlcode += "        margin-bottom: 20px;\n";
  htmlcode += "    }\n";
  htmlcode += "    .units {\n";
  htmlcode += "        font-size: 1rem;\n";
  htmlcode += "    }\n";
  htmlcode += "    .dht-labels {\n";
  htmlcode += "        font-size: 1.3rem;\n";
  htmlcode += "        vertical-align: middle;\n";
  htmlcode += "        padding-bottom: 15px;\n";
  htmlcode += "    }\n";
  htmlcode += "</style>\n";
  htmlcode += "<title>ESP32 Web Server</title>\n";
  htmlcode += "<script>\n";
  htmlcode += "setInterval(function() {\n";
   htmlcode += "  fetch('/data')\n";
  htmlcode += "    .then(response => response.text())\n";
  htmlcode += "    .then(data => {\n";
  htmlcode += "      document.getElementById('distance').innerHTML= 'Infrared Value: ' + data + ' cm';\n";
  htmlcode += "    console.log(data)\n";
  htmlcode += "      sendDataToServer(data);\n";
  htmlcode += "    })\n";
  htmlcode += "    .catch(error => {\n";
  htmlcode += "      console.error('Error fetching infrared value:', error);\n";
  htmlcode += "    });\n";
  htmlcode += "}," + String(interval) + ");\n";
    // Function to send data to the server
  htmlcode += "function sendDataToServer(data) {\n";
  htmlcode += "  const url = 'https://immer-safe.onrender.com/sensor';\n"; // Replace with your backend server URL
 htmlcode += "  const jsonData = JSON.stringify({ data });\n";
  htmlcode += "  fetch(url, {\n";
  htmlcode += "    method: 'POST',\n";
  htmlcode += "    headers: {\n";
  htmlcode += "      'Content-Type': 'application/json'\n"; // Specify content type
  htmlcode += "    },\n";
  htmlcode += "    body:jsonData\n";
  htmlcode += "  })\n";
  htmlcode += "  .then(response => {\n";
  htmlcode += "    if (!response.ok) {\n";
  htmlcode += "      throw new Error('Network response was not ok');\n";
  htmlcode += "    }\n";
  htmlcode += "  })\n";
  htmlcode += "  .catch(error => {\n";
  htmlcode += "    console.error('Error sending data to server:', error);\n";
  htmlcode += "  });\n";
  htmlcode += "}\n";
  htmlcode += "</script>\n";
  htmlcode += "</head>\n";
  htmlcode += "<body>\n";
  htmlcode += "<h1>ESP32 Web Server</h1>\n";
  htmlcode += "<h3>A simple demo using Access Point(AP) Mode</h3>\n";
  htmlcode += "<p id='distance'>Distance: " + String(infrared_value_1) + " cm</p>\n"; // Initial value displayed
  htmlcode += "</body>\n";
  htmlcode += "</html>\n";
  return htmlcode;
}

void handle_OnConnect() {
  server.send(200, "text/html", getHTML());
}

void handle_getData() {
  String jsonData = "{\"AO1\": " + String(infrared_value_1) + ", \"DO1\": " + String(flame_state_1) +  " , \"AO2\": " + String(infrared_value_2) +  " ,\"DO2\": " + String(flame_state_2) +  " }";
  server.send(200, "text/plain",jsonData );
}

void handle_NotFound() {
  server.send(404, "text/plain", "Not Found");
}
