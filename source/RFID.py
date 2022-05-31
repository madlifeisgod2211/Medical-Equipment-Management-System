from cgi import test
from re import T
import time
from matplotlib.pyplot import jet
import schedule
import pyrebase
from pynput.keyboard import Key, Controller
from config import firebaseConfig
from threading import Timer

# set up firebase connection
firebase = pyrebase.initialize_app(firebaseConfig)
db  = firebase.database()
print("Connected to Firebase")

# import data from database
data = db.child("ID Test").shallow().get()
getID = list(data.val())
user = db.child("User").shallow().get()
getUser = list(user.val())

# reset data
# for i in range(0, len(getID) + 1):
#     db.child("ID").child(i).update({"status": 0})

# check imported data
print("Get ID : ")
getID.sort()
print(getID)
print("Get user ID : ")
print(getUser)

# test data
test_data = ['0007802', '0007700','00078706','00078706', '00078800', '00078801', '00078802', '00078705', '00078701'
, '00078725', '00078706', '00078733','0007699', '00078801', '00078729','00078706']

# set up GPIO
red = 11
green = 13
locker = 15
buzzer = 16

# RFID Function
class RFID:
    # Turn on RFID
    def activate():
        keyboard = Controller()
        keyboard.press(Key.caps_lock)
        keyboard.release(Key.caps_lock)

    # read data
    def start(id): 
        set_timer = 2
        t = Timer(set_timer, RFID.start())
        t.start()
        tagID = input("RFID tag : ")
        t.cancel()

    # get three last ID
    def lastID(id):
        if '0' in id:
            id = id[-3:]
        else:
            id = 0
        return id

    # remove the same ID
    def removeSameID(id):
        #id.sort()
        temp = []
        temp.append(id[0])
        for i in range(1, len(id)):
            if id[i] != id[i-1]:
                temp.append(id[i])
        return temp

    def updateID(id, ref):
        for i in id:
            for j in ref:
                if i == j:
                    db.child("ID Test").child(jet).update({"status": 1})
                    print("Available ID : {%s}"%(j))
                else:
                    db.child("ID Test").child(j).update({"status": 1})
                    print("Unavailable ID : {%s}"%(j))



    
# MAIN
# test = RFID.lastID(test_data)
# print("Test 3 ID : ")
# print(test)
# test = RFID.removeSameID(test)
# print("Test data : ")
# print(test)
# test = RFID.updateID(test, getID)
def binarySearch(ref, id):
    left = 0
    right = len(id) - 1
    while (right >= left):
        mid = round((left + right) / 2)
        #print("mid = %s"%(mid))
        if id[mid] == ref:
            return ref
        if id[mid] > ref:
            right = mid - 1
        else:
            left = mid + 1
    return -1
# getID.sort()
# # x, id = binarySearch(getID, '706')
# # print("Found {%s} at index {%s}"%(id, x))
# # getID.sort()
# test_data.sort()
# data = list(map(RFID.lastID, test_data))
# data.sort()
# print("Data : ")
# print(data)
# arr = []
# for i in data:
#     x = binarySearch(getID, i)
#     arr.append(x)

# print("Found ID: ")
# print(arr)
# -------------------- MAIN -------------------------
#TEST DATA
print("ID tags : ")
print(test_data)

# GET THREE LAST ID
id = list(map(RFID.lastID, test_data))
print("Get three last ID : ")
print(id)

# SORT ID
id.sort()
print("ID after sorting : ")
print(id)

# REMOVE THE SAME ID
id = RFID.removeSameID(id)
print("Remove the same ID : ")
print(id)

# BINARY SEARCH
arr = []
for i in getID:
    x = binarySearch(i, id)
    if x != -1:
        arr.append(x)
    else:
        arr.append(-1)

print("ID after searching : ")
print(arr)

# UPDATE DATA
#RFID.updateID(getID, arr)
