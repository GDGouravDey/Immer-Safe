#include <WiFi.h>
#include <HTTPClient.h>

#define AO_PIN_1 32  // ESP32's pin GPIO32 connected to AO pin of the first flame sensor
#define DO_PIN_1 13  
#define AO_PIN_2 33  // ESP32's pin GPIO33 connected to AO pin of the second flame sensor
#define DO_PIN_2 14 

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
String serverUrl = "https://immer-safe.onrender.com/sensor";


void setup() {
  Serial.begin(115200);

  pinMode(DO_PIN_1, INPUT);
  pinMode(DO_PIN_2, INPUT);

  Serial.println();
  Serial.print("Connecting to WiFi");

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(400);
  }

  Serial.println("\nConnected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}


void loop() {
  int AO1 = analogRead(AO_PIN_1);
  int DO1 = digitalRead(DO_PIN_1);
  int AO2 = analogRead(AO_PIN_2);
  int DO2 = digitalRead(DO_PIN_2);

  Serial.println("----------- SENSOR VALUES -----------");
  Serial.println("AO1: " + String(AO1));
  Serial.println("DO1: " + String(DO1));
  Serial.println("AO2: " + String(AO2));
  Serial.println("DO2: " + String(DO2));

  if (AO1 < 200 || AO2 < 200) {
    Serial.println("Fire Detected → Sending info to backend...");
  } else {
    Serial.println("No fire. Not sending.");
    delay(1000);
    return;
  }

  if (WiFi.status() == WL_CONNECTED) {

    WiFiClientSecure client;
    client.setInsecure();   

    HTTPClient http;
    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");

    String jsonData = "{";
    jsonData += "\"data\":{";
    jsonData += "\"AO1\":" + String(AO1) + ",";
    jsonData += "\"DO1\":" + String(DO1) + ",";
    jsonData += "\"AO2\":" + String(AO2) + ",";
    jsonData += "\"DO2\":" + String(DO2);
    jsonData += "}}";

    Serial.println("Sending JSON: " + jsonData);

    int responseCode = http.POST(jsonData);

    Serial.print("Response Code: ");
    Serial.println(responseCode);

    if (responseCode > 0) {
      String response = http.getString();
      Serial.println("Server Response: " + response);
    } else {
      Serial.println("Failed to connect or send!");
    }

    http.end();
  } 
  else {
    Serial.println("WiFi Disconnected!");
  }

  delay(3000);
}
