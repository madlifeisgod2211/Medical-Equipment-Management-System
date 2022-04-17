from RFID import *

if __name__ == '__main__':
    try:
        RFID.get_data()
        while True:
            open = Door.check_id_user(isClosed)
            print("Open = ", Door.open())
    except KeyboardInterrupt:
        GPIO.cleanup()
    finally:
        GPIO.cleanup()