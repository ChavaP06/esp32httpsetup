#include "MicMMS.h"
#include <HTTPClient.h>
#include <ArduinoJson.h>

MicMMS aaa("MIC_2.4GHz", "999999999", "192.168.100.50", 1883,"test", 1, Serial1,"192.168.100.111","192.168.0.1","255.255.255.0");

String serverName = "http://192.168.100.50:2005/api/getTableData";

unsigned long previousMillis = 0;
const long interval = 3000;


void setup() {
  aaa.init();
  aaa.start();

//  Serial.println(aaa.get_def_tb());
  
}
  
void loop() {
  aaa.run();
  unsigned long currentMillis = millis();
  if(currentMillis - previousMillis >= interval){
    HTTPClient http;
    http.useHTTP10(true);
    http.begin(serverName.c_str());

    // Send HTTP GET request
    int httpResponseCode = http.GET();
      
    if (httpResponseCode>0) {
      
        DynamicJsonDocument doc(2048);
        deserializeJson(doc, http.getStream());
        
        std::vector<std::vector<String>> v1;
        v1.resize(doc.size());
        
        for(int i = 0;i < v1.size();i++){
          for(int j = 0; j < 5;j++){
            if(j < 3){
               v1[i].push_back((const char*)doc[i]["values"][j]);
            }else{
              v1[i].push_back("");
            }
 
          }
        }
        aaa.set_def_tb(v1);
        
        std::vector<std::vector<String>> v2 = aaa.get_def_tb();
        for(int i = 0;i < v2.size();i++){//print test
          for(int j = 0; j < 5; j++){
            Serial.print(v2[i][j]);Serial.print(",");
          }
          Serial.println();
        }
     }
     else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
     }
    http.end();
    previousMillis = currentMillis;
  }
  
}
