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
    
    
    
    
    
class ObDetail(models.Model):
    ob_no                  = models.CharField(max_length=255, default='', null=True, blank=True)
    parts                  = models.CharField(max_length=100, null=True, blank=True)
    operation              = models.CharField(max_length=1500, null=True, blank=True)
    type_of_machine        = models.CharField(max_length=1500, null=True, blank=True)
    attachments            = models.CharField(max_length=1500, null=True, blank=True)
    sam                    = models.FloatField(null=True, blank=True)
    theoretical_manpower   = models.FloatField(null=True, blank=True)
    planned_work_station   = models.IntegerField(null=True, blank=True)
    target_100_pcs         = models.IntegerField(null=True, blank=True)
    target_60_pcs          = models.IntegerField(null=True, blank=True)
    seam_length            = models.IntegerField(null=True, blank=True)
    remark                 = models.CharField(max_length=1500, null=True,blank=True) 
    
    # operation_sam          = models.FloatField(null=True, blank=True)
    # balanced_manpower      = models.FloatField(null=True, blank=True)
    # actual_manpower        = models.FloatField(null=True, blank=True)

    is_active  = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.parts

    class Meta:
        db_table = 'ob_detail'