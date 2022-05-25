
String response;
String data_;

int knob_1 = 33;
int knob_2 = 4;
int knob_3 = 32;
int knob_4 = 2;

int BTN = 13;

int val_1 = 40;
int val_2 = 40;
int val_3 = 40;
int val_4 = 40;

void setup() {
  // put your setup code here, to run once:
  pinMode(BTN, INPUT);
  Serial.begin(115200);
}

void loop() {
  val_1 = (analogRead(knob_1) / 4095.0) * 100;
  val_2 = (analogRead(knob_2) / 4095.0) * 100;
  val_3 = (analogRead(knob_3) / 4095.0) * 100;
  val_4 = (analogRead(knob_4) / 4095.0) * 100;
  
  int btn_state = digitalRead(BTN);

  if (btn_state == HIGH) {
    Serial.println("LASER");
    delay(200);
  }

//  if (Serial.available()) {
//    while(Serial.available()){
//       Serial.read();
//    }
    data_ = String(val_1) + " " + String(val_2) + " " + String(val_3) + " " + String(val_4);
    Serial.println(data_);
///


  delay(10);
}





//  // put your main code here, to run repeatedly:
//  if (Serial2.available()) {
//    // while (!Serial2.available() || !Serial.available());
//    response = Serial2.readStringUntil('Q');
//    Serial2.print(response);
//    Serial.println(response);
//  }
//  if (Serial.available() > 0) {
//    message = Serial.readStringUntil('Q');
//    Serial2.print(message);
//  }



//  WiFi.begin(ssid, password);
//  while (WiFi.status() != WL_CONNECTED) {
//    delay(500);
//    Serial.println("Connecting to WiFi..");
//  }
//
//  Serial.println("Connected to the WiFi network");
//
//  webSocket.begin("echo.websocket.org", 80, "/");
//  // webSocket.begin("adwinthief.com", 80, "/publish");



  
