from matplotlib.pyplot import jet
import pyrebase
import schedule
import time
from threading import Timer
firebaseConfig = {
  "apiKey": "AIzaSyDIVZpkltz4SqMdDjIsz1rQfglvwEklgDo",
  "authDomain": "smart-bag-f74be.firebaseapp.com",
  "databaseURL": "https://smart-bag-f74be-default-rtdb.firebaseio.com",
  "projectId": "smart-bag-f74be",
  "storageBucket": "smart-bag-f74be.appspot.com",
  "messagingSenderId": "669735670893",
  "appId": "1:669735670893:web:b04df1b54ea830ee845b64",
  "measurementId": "G-XDJDVFL44F"
  }

# CONNECT FIREBASE
firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()
print("Connected to Firebase")

# IMPORT DATA FROM DATABASE
ref = db.child("ID").shallow().get()
data = list(ref.val())
print("Reference: ")
print(data)
user_ref = db.child("User").shallow().get()
user = list(user_ref.val())
print("User: ")
print(user)

# ID STRING
test = ['0007802', '00078800', '00078801', '00078802', '00078705', '00078701'
, '00078725', '00078706', '00078733', '00078801']

# # REDUCE LENGTH OF ID STRING
def lastID(data):
    if '0' in data:
        data = data[-3:]
    else:
        data = 0
    return data
arr = list(map(lastID, test))
arr.sort()


# # REMOVE THE SAME ID
temp = []
temp.append(arr[0])
for i in range(1, len(arr)):
    if arr[i] != arr[i-1]:
        temp.append(arr[i])
print("Result: ")
print(temp)

# UPDATE ID
for i in temp:
    for j in data:
        if i  == j:
            db.child("ID").child(j).update({"status": 1})
            print("Available ID {%s}"%(j))
        else:
            db.child("ID").child(j).update({"status": 1})
            print("Unavailable ID {%s}"%(j))
# def stop():
#     print("Stop")
# while True:
#     t = Timer(1, stop())
#     t.start()
#     id = input("Enter ID : ")
#     t.cancel()

# schedule.every(5).seconds.do(stop)
# while True:
#     schedule.run_pending()
#     time.sleep(1)

