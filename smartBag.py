from RFID import *


if __name__ == "__main__":
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
            GPIO.output(red_led, GPIO.LOW)
            time.sleep(2)
            GPIO.output(red_led, GPIO.HIGH)
    