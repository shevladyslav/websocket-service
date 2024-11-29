from aiohttp import web
import socketio

sio = socketio.AsyncServer(cors_allowed_origins=["http://localhost:3000"])
app = web.Application()
sio.attach(app)


async def index(request):
    return web.json_response({"message": "Welcome to the WebSocket server!"})


@sio.event
def connect(sid, environ):
    print("connect ", sid)


@sio.event
async def chat_message(sid, data):
    print("message ", data)


@sio.event
def disconnect(sid):
    print('disconnect ', sid)


app.router.add_get('/', index)

if __name__ == '__main__':
    web.run_app(app)
