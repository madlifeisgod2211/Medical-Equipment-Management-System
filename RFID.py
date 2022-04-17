# IMPORT LIBRARY
from threading import Timer
import pyrebase
import time
import schedule
import RPi.GPIO as GPIO
from pynput.keyboard import Key, Controller
from datetime import date, datetime
from mfrc522 import SimpleMFRC522
from sourceCode.config import *

# SET UP FIREBASE CONNECTION
firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()
print("Connected to Firebase")

# IMPORT DATA FROM DATABASE
#data = db.child("ID").shallow().get()
# id = list(data.val())
user = db.child("User").shallow().get()
user_id = list(user.val())
ID_list = []
status_list = []
isClosed = True

# SET UP GPIO 
red_led = 11
locker = 13
button = 15
buzzer = 16
GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(locker,GPIO.OUT)
GPIO.setup(red_led, GPIO.OUT)
GPIO.setup(buzzer,GPIO.OUT)
GPIO.setup(button, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.output(locker,GPIO.LOW)
GPIO.output(red_led, GPIO.HIGH)
GPIO.output(buzzer, GPIO.HIGH)

# SET UP RFID VALIDATION
reader = SimpleMFRC522()

# RFID VALIDATION CALLBACK FUNCTIONS
class RFID_Validation():

    def read():
        print("Reading ... Please place the card ... ")
        id, text = reader.read()
        print("ID: %s \n Text: %s" % (id,text))
        return id
    def write():
        text = input("Please enter new user's name: ")
        print("Please place the card to complete writing")
        id, name = reader.write(text)
        print("Data" + name + " writing is completed")

# ACTIVATE RFID FUNCTION
class Activate():
    def turn_on():
        keyboard = Controller()
        keyboard.press(Key.caps_lock)
        keyboard.release(Key.caps_lock)

    def ignore():
        enter = Controller()
        enter.press(Key.enter)
        enter.release(Key.enter)

# FIREBASE API
class RFID():

    def license():
        key = db.child("License").child("Key").get()
        return key.val()

    def update(id_list, status_list):
        Activate.turn_on()
        db.child("Test").set({0:0})
        # UPDATED STATUS LIST
        for i in id_list:
            db.child("Test").child(i).set({i:i})
        print("Updated sucessfully")

        # COUNT NUMBER OF DEVICES
        n = id_list.count(1)
        print("Total available devices: " + str(n))

        # TURN ON LED IF DEVICES IS FULL
        if n >= 3:
            print("Turn on green LED") 
            GPIO.output(red_led, 1)
        else:
            print("Turn on red LED")
            GPIO.output(red_led, 0)

        # RESET STATUS
        id_list = []
        print("Refresh ID List")
        Activate.turn_on()

    def get_data():
        pass
            
    def start(id_list):
        # TIMER 
        set_timer = 3
        t = Timer(set_timer, Activate().ignore())
        t.start()
        tagID = input("Enter RFID tag: ")
        t.cancel()

        # INPUT
        if '0' in tagID:
            tagID = tagID[-3:]
        else:
            tagID = 0
        print("RFID tag is: " + str(tagID))
        id_list.append(tagID)


    def main(isClosed):

        # CHECK KEYS
        key = 2021
        Activate().turn_on()
        if RFID().license() == key:
            print("Your key is valid")

        # AUTOMATED RUN 
            schedule.every(1).seconds.do(RFID.start, status_list, ID_list)
            schedule.every(2).seconds.do(RFID.update, status_list, ID_list)

            while True:
                run = Door.open()
                if isClosed == False and run != True:
                    print("Check button")
                    schedule.run_pending()
                    time.sleep(0.2)
                else:
                    break
        
        else:
            while True:
                print("Error ... Your system has been disable")
                GPIO.output(red_led, GPIO.LOW)
                time.sleep(2)
                GPIO.output(red_led, GPIO.HIGH)
        
# DOOR FUNCTION
class Door():
    def button():
        if GPIO.input(button) != GPIO.HIGH:
            GPIO.output(locker, GPIO.LOW)
            GPIO.output(red_led, GPIO.LOW)
            GPIO.output(red_led, GPIO.HIGH)
            print("CLOSE THE DOOR")
            return True
        else:
            return False

    def open():
        GPIO.output(locker, GPIO.HIGH)
        GPIO.output(buzzer, GPIO.LOW)
        GPIO.output(buzzer, GPIO.HIGH)
        print("OPEN THE DOOR")

    def close():
        GPIO.output(locker, GPIO.LOW)
        GPIO.output(red_led, GPIO.LOW)
        GPIO.output(red_led, GPIO.HIGH)
    
    def check_id_user(isClosed):
        while isClosed:
            user = str(RFID_Validation().read())
            for i in user_id:
                if i  == user:
                    isClosed = False
                    break
        
        if isClosed == False:
            Door().open()
        elif isClosed == True or Door().button() == True:
            Door().close()
        
        return isClosed

