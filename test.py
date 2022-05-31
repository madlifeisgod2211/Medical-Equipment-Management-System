tagID = input("Enter RFID tag: ")
if '0' in tagID:
    id = tagID[-3:]
else:
    id = 0
print("RFID tag is : " + str(id))