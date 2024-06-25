from django.db import models
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json

# Create your models here.

class ApplyLeave(models.Model):
    Employ_name=models.CharField(max_length=50)
    Title=models.CharField(max_length=50)
    discription=models.CharField(max_length=50)
    date=models.DateField(auto_now=True)
    
    def save(self, *args, **kwargs):
        channel_layer=get_channel_layer()
        data={
            "Employ_Name": self.Employ_name,
            "Title": self.Title
        }
        async_to_sync(channel_layer.group_send)(
            'room_group_testing',{
               'type' : 'notification_send',
               'value' : json.dumps(data)
            }
        )
        super(ApplyLeave, self).save(*args, **kwargs)


class Image_model(models.Model):
    image = models.ImageField(upload_to='images/')