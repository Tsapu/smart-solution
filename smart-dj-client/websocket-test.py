import websocket
import requests
import rel
import time
import json

url = 'https://adwinthief.com/laser'
myobj = { 'laser': 1 }
# ws_url = 'ws://localhost:5000/publish'
ws_url = 'wss://adwinthief.com/publish'

data = {"one": 50, "two": 100, "three": 25, "four": 25}
# json.dumps(data)

ws = websocket.WebSocket()
ws.connect(ws_url)

value_list = ["50", "20", "1", "50"]

while True:
	values = {
		"one": int(value_list[0]),
		"two": int(value_list[1]),
		"three": int(value_list[2]),
		"four": int(value_list[3]),
	}
	ws.send(json.dumps(data))
	time.sleep(0.5)

# x = requests.post(url, data = myobj)
# print(x.text)

def on_message(ws, message):
	ws.send('{"one": 50, "two": 100, "three": 25, "four": 25}')
    #print(message)

def on_error(ws, error):
    print(error)

def on_close(ws, close_status_code, close_msg):
    print("### closed ###")

def on_open(ws):
	ws.send('{"one": 50, "two": 100, "three": 25, "four": 25}')
	print("Opened connection")

# websocket.enableTrace(True) # debug
# ws = websocket.WebSocketApp(ws_url,
#                               on_open=on_open,
#                               on_error=on_error,
#                               on_close=on_close)

# ws.run_forever(dispatcher=rel)  # Set dispatcher to automatic reconnection
# rel.signal(2, rel.abort)  # Keyboard Interrupt
# rel.dispatch()

# while True:
# 	ws.send('{"one": 50, "two": 100, "three": 25, "four": 25}')
# 	time.sleep(2)