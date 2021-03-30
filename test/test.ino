int a=0;
int led =13;
char x="b";

void setup() {
  Serial.begin(9600);
  pinMode(led,OUTPUT);
}

void loop() {
  Serial.println(a);
  if (Serial.available() > 0) {
    x = Serial.read();
    Serial.println(x);
    if(x==97){
      digitalWrite(led,HIGH);
    }
    else if(x==98){
      digitalWrite(led,LOW);
    }
  }
  
  a++;
  delay(1000);

}
