import sys, serial, serial.tools.list_ports, warnings, time  
import asyncio
import websockets
import time
from asyncio.futures import Future
#port tespit etme - baslangic     ##############
ports = [
        p.device
        for p in serial.tools.list_ports.comports()
        if 'USB' in p.description
        ]
if not ports:
    raise IOError("Seri Baglantili cihaz yok!")
else:
    ser = serial.Serial(ports[0],9600)
#port tespit etme - son           ###############



async def data(websocket, path):
    while True:
        line = ser.readline().decode('utf-8')
        await websocket.send(str(line))
        
        asyncio.gather(send(websocket))

        await asyncio.sleep(0.01)

async def send(websocket):
    dönüt=0
    try:dönüt = await websocket.recv() 
    except :pass
    if dönüt=="97":ser.write("a".encode());print("a")
    if dönüt=="98":ser.write("b".encode());print("b")


    
start_server = websockets.serve(data, "0.0.0.0", 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
