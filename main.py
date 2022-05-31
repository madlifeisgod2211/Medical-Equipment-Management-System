class Activate:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def printName(self):
        print("This is {0}, age is {1}".format(self.name, self.age))

p1 = Activate("John", 12)
p1.printName()

ref = ['00078799', '00078800', '00078801', '00078802', '00078803', '00078804'
, '00078805', '00078806', '00078807', '00078808']

arr = ['00078799', '00078800', '00078801', '00078802', '00078803', '00078804'
, '00078805', '00078806', '00078807', '00078808']

def getLastID(data):
    if '0' in data:
        data = data[-3:]
    else:
        data = 0
    return data

arr = list(map(getLastID, arr))
print("Array: ")
print(arr)

test = ['701', '702', '704', '703', '702', '800']
test1 = ['701', '701', '702', '701', '702', '704', '703', '702', '800'
, '701', '702', '801', '801', '801', '701', '801', '802']
test.sort()
test1.sort()
print("Array 1 : ")
print(test1)
print(len(test1))

temp = []

temp.append(test1[0])

for i in range(1, len(test1)):
    if test1[i] != test1[i-1]:
        temp.append(test1[i])

print("Array 2: ")
print(test1)
print("Handled data: ")
print(temp)




