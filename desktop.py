# IMPORT LIBRARY
from threading import Timer
import pyrebase
import time
import schedule
from pynput.keyboard import Key, Controller
from datetime import date, datetime
from config import *

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

    def update(id_list):
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
        else:
            print("Turn on red LED")

        # RESET STATUS
        id_list = []
        print("Refresh ID List")

        Activate.turn_on()

    def get_data():

        pass
            
    def start(id_list):
        # TIMER 
        set_timer = 3
        t = Timer(set_timer, Activate.ignore())
        t.start()
        tagID = input("Enter RFID tag: ")
        t.cancel()

        # HANDLE ID DATA
        if '0' in tagID:
            tagID = tagID[-2:]
        else:
            tagID = 0
        print("RFID tag is: " + str(tagID))
        id_list.append(tagID)


    def main():

        # CHECK KEYS
        key = 2021
        Activate.turn_on()
        if RFID.license() == key:
            print("Your key is valid")

        # AUTOMATED RUN 
            schedule.every(1).seconds.do(RFID.start, ID_list)
            schedule.every(2).seconds.do(RFID.update, ID_list)

            while True:
                schedule.run_pending()
                time.sleep(0.2)
               
        
        else:
            while True:
                print("Error ... Your system has been disabled")
                time.sleep(2)
               
if __name__ == '__main__':
    try:
        RFID.main()
        
    except KeyboardInterrupt:
        print("End program")


