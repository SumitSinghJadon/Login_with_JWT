
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import json

class MyConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name ="room_testing"
        self.room_group_name="room_group_testing"
        async_to_sync(self.channel_layer.group_add)(
              self.room_group_name,
              self.channel_name
        )
        self.accept()
        

    def disconnect(self, *args, **kwargs):
        print("disconnect")

    def receive(self, text_data):
        print(text_data)
       
        
    def notification_send(self, event):
        data = json.loads(event.get('value'))
        print(event)
        self.send(text_data=json.dumps({
            "status": data
        }))
    
        
        
