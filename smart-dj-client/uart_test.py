#!/usr/bin/env python3
import RPi.GPIO as GPIO
import serial
import threading

ser = serial.Serial(            
	port='/dev/serial0',
	baudrate = 115200,
	parity=serial.PARITY_NONE,
	stopbits=serial.STOPBITS_ONE,
	bytesize=serial.EIGHTBITS,
	timeout=1
)

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)

PUD_RES = 13
BUTTON = 11

def button_handler(event):
	print("Button press detected!")


def setup():
	# Set up the button input pin, will be used with a pull-down resistor, setting it to low will automatically set it as a listener
	GPIO.setup(BUTTON, GPIO.IN)
	GPIO.add_event_detect(BUTTON, GPIO.RISING, callback=button_handler, bouncetime=300)

	# Set up the pulldown resistor pin for the button
	GPIO.setup(PUD_RES, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

# {one: 25, two: 25, three: 25, four: 25}
# threading.Thread(target=receiver, daemon=True).start()

def main():
	try:
		while True:
			data = ser.readline().decode('utf-8')
			value_list = data.strip().split(" ")
			print(value_list)

	except KeyboardInterrupt:
		print("\n Keyboard interrupt")
		GPIO.cleanup()

if __name__ == "__main__":
	main()
