/*
 * Wallet-Based Auto Charge Cutoff System
 * Controls relay to cut power when wallet balance drops below threshold
 * 
 * Components needed:
 * - Arduino (Uno/Nano/ESP8266/ESP32)
 * - 5V Relay Module
 * - LCD Display (16x2, optional)
 * - WiFi module (if using Arduino Uno/Nano) or ESP8266/ESP32
 */

#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Pin definitions
#define RELAY_PIN 7
#define LED_PIN 13

// Wallet configuration
float walletBalance = 1000.0;  // Initial balance
float minBalance = 50.0;        // Minimum balance threshold
float chargeRate = 10.0;        // Cost per hour of charging
bool chargeEnabled = true;

// Time tracking
unsigned long lastUpdateTime = 0;
unsigned long updateInterval = 3600000; // 1 hour in milliseconds

// LCD setup (0x27 is common I2C address, adjust if needed)
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  Serial.begin(9600);
  
  // Initialize pins
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  
  // Initialize LCD
  lcd.init();
  lcd.backlight();
  lcd.clear();
  
  // Initial display
  updateDisplay();
  
  // Initial relay state
  controlRelay();
  
  Serial.println("Wallet Charge Control System Started");
  Serial.println("Commands: BAL <amount> | SET <threshold> | RATE <cost>");
}

void loop() {
  // Check for serial commands
  if (Serial.available() > 0) {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim();
    processCommand(cmd);
  }
  
  // Periodic balance deduction (simulates hourly charging cost)
  unsigned long currentTime = millis();
  if (currentTime - lastUpdateTime >= updateInterval) {
    if (chargeEnabled) {
      deductCharge();
    }
    lastUpdateTime = currentTime;
  }
  
  // Update display every 2 seconds
  static unsigned long lastDisplay = 0;
  if (millis() - lastDisplay >= 2000) {
    updateDisplay();
    lastDisplay = millis();
  }
  
  delay(100);
}

void processCommand(String cmd) {
  cmd.toUpperCase();
  
  // Update wallet balance
  if (cmd.startsWith("BAL ")) {
    float newBalance = cmd.substring(4).toFloat();
    walletBalance = newBalance;
    Serial.print("Balance updated to: ");
    Serial.println(walletBalance);
    controlRelay();
  }
  
  // Set minimum balance threshold
  else if (cmd.startsWith("SET ")) {
    float newThreshold = cmd.substring(4).toFloat();
    minBalance = newThreshold;
    Serial.print("Threshold set to: ");
    Serial.println(minBalance);
    controlRelay();
  }
  
  // Set charge rate
  else if (cmd.startsWith("RATE ")) {
    float newRate = cmd.substring(5).toFloat();
    chargeRate = newRate;
    Serial.print("Charge rate set to: ");
    Serial.println(chargeRate);
  }
  
  // Get current status
  else if (cmd == "STATUS") {
    printStatus();
  }
  
  else {
    Serial.println("Unknown command");
    Serial.println("Valid: BAL <amount> | SET <threshold> | RATE <cost> | STATUS");
  }
}

void deductCharge() {
  walletBalance -= chargeRate;
  Serial.print("Charge deducted. New balance: ");
  Serial.println(walletBalance);
  
  controlRelay();
}

void controlRelay() {
  if (walletBalance >= minBalance) {
    // Enable charging
    digitalWrite(RELAY_PIN, HIGH);
    digitalWrite(LED_PIN, HIGH);
    chargeEnabled = true;
    Serial.println("CHARGE ENABLED");
  } else {
    // Disable charging
    digitalWrite(RELAY_PIN, LOW);
    digitalWrite(LED_PIN, LOW);
    chargeEnabled = false;
    Serial.println("CHARGE DISABLED - Low Balance!");
  }
  
  updateDisplay();
}

void updateDisplay() {
  lcd.clear();
  
  // Line 1: Wallet balance
  lcd.setCursor(0, 0);
  lcd.print("Bal: $");
  lcd.print(walletBalance, 2);
  
  // Line 2: Status
  lcd.setCursor(0, 1);
  if (chargeEnabled) {
    lcd.print("Status: ON ");
  } else {
    lcd.print("Status: OFF");
  }
}

void printStatus() {
  Serial.println("=== System Status ===");
  Serial.print("Wallet Balance: $");
  Serial.println(walletBalance);
  Serial.print("Minimum Balance: $");
  Serial.println(minBalance);
  Serial.print("Charge Rate: $");
  Serial.print(chargeRate);
  Serial.println("/hour");
  Serial.print("Charge Status: ");
  Serial.println(chargeEnabled ? "ENABLED" : "DISABLED");
  Serial.println("====================");
}