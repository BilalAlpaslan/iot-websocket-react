import serial
from serial.tools import list_ports
from fastapi import FastAPI, WebSocket


app = FastAPI()


def get_port() -> serial.Serial:
    ports = [p.device for p in list_ports.comports() if 'USB' in p.description]
    if not ports:
        raise IOError("Seri Baglantili cihaz yok!")
    return serial.Serial(ports[0], 9600)


ser = get_port()


@app.websocket("/")
async def websocket_endpoint(websocket: WebSocket):
    websocket.accept()

    try:
        while True:
            data = await websocket.receive_text()

            if data == "97":
                ser.write("a".encode())
                print("a")
            elif data == "98":
                ser.write("b".encode())
                print("b")
            else:
                print("[another commend]", data)

    except Exception as e:
        print("disconnect", e)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(
        "main:app",
        host="192.168.1.104",
        port=8001,
    )
