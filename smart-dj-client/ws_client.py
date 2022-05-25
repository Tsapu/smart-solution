#!/usr/bin/env python3
import serial
import requests
import websocket
import json


laser_endpoint = 'https://adwinthief.com/laser'
publish = 'wss://adwinthief.com/publish'

ser = serial.Serial(            
	port='/dev/ttyUSB0',
	baudrate = 115200,
	timeout=1 # how long to wait before blocking stops
)
ser.rts = 0
ser.dtr = 0

def main():
	ws = websocket.WebSocket()
	ws.connect(publish)
	try:
		while True:
			data = ser.readline().decode('utf-8')
			print(data)

			if (data.strip() == "LASER"):
				requests.post(laser_endpoint, data = { 'laser': 1 } )
				continue
			value_list = data.strip().split(" ")
			if (len(value_list) != 4): # no I don't want to go on a date with you
				continue
			
			values = {
				"one": int(value_list[0]),
				"two": int(value_list[1]),
				"three": int(value_list[2]),
				"four": int(value_list[3]),
			}
			ws.send(json.dumps(values))

	except KeyboardInterrupt:
		print("\n Keyboard interrupt")
		ws.close()


if __name__ == "__main__":
	main()
