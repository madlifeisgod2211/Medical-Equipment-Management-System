import time
import pyrebase
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

# check imported data
print("Get ID : ")
getID.sort()
print(getID)
print("Get user ID : ")
print(getUser)

# test data
test_data = ['7678870007802', '7678870007700','76788700078706','76788700078706', '76788700078800', '76788700078801', '76788700078802', '00078705', '00078701'
, '76788700078725', '76788700078706', '76788700078733','7678870007699', '76788700078801', '76788700078729','76788700078706']

# RFID Function

# remove the same ID
def removeSameID(id):
    temp = []
    temp.append(id[0])
    for i in range(1, len(id)):
        if id[i] != id[i-1]:
            temp.append(id[i])
    return temp

def partition(left, right, arr):
    # the last element will be the pivot and the first element is the pointer
    pivot = arr[right]
    ptr = left

    for i in range(left, right):
    # if element is smaller than pivot
        if arr[i] <= pivot:
            # then swap element to pointer
            arr[i], arr[ptr] = arr[ptr], arr[i]
            ptr += 1

    # Finally swapping the last element with the pointer indexed number
    arr[ptr], arr[right] = arr[right], arr[ptr]
    return ptr


def quickSort(left, right, arr):
    if len(arr) == 1:
        return arr

    if left < right:
        pivot = partition(left, right, arr)
        quickSort(left, pivot - 1, arr)
        quickSort(pivot + 1, right, arr)
    return arr

def binarySearch(left, right, arr, key):
    for i in range(left, right):
        mid = int(left + right) // 2
        if key == arr[mid]:
            return mid
        elif key >= arr[mid]:
            left = mid + 1
        else:
            right = mid - 1
    return -1 

def updateID(id, ref):
    for i in id:
        for j in ref:
            if i == j:
                db.child("ID Test").child(j).update({"status": 1})
                print("Available ID : {%s}"%(j))
            else:
                db.child("ID Test").child(j).update({"status": 1})
                print("Unavailable ID : {%s}"%(j))
    

# -------------------- MAIN -------------------------
#TEST DATA
print("ID tags : ")
print(test_data)

# SORT ID
id = quickSort(test_data)
print("ID after sorting : ")
print(id)

# REMOVE THE SAME ID
id = removeSameID(id)
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

