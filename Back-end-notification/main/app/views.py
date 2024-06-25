from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets
from .models import *
from .serializers import LeaveSerializer


from PIL import Image, ImageFilter
from io import BytesIO
from .models import Image_model
from .serializers import SketchSerializer
from django.http import HttpResponse
import os
from django.conf import settings
import tempfile

# Create your views here.


class LeaveViewSet(viewsets.ModelViewSet):
    
    queryset = ApplyLeave.objects.all()
    serializer_class = LeaveSerializer
    
    
class ChartDataViewSet(viewsets.ViewSet):
    
    def list(self, request):
        days_of_week = [
            'Sunday',    
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ]  
        data={}
        
         
        for day in days_of_week:
            day_index = days_of_week.index(day) + 1
            print("day =",day,"index =",day_index)
            filter_data=ApplyLeave.objects.filter(date__week_day=day_index).count()
            data[day] = filter_data 
        return Response(data)
        
from PIL import Image, ImageFilter
import tempfile
import os
from django.http import JsonResponse
from django.conf import settings
from rest_framework import viewsets
from PIL import Image, ImageFilter
from django.http import JsonResponse
from django.conf import settings
from rest_framework import viewsets
from .models import Image_model  # Replace with your actual Image_model import
import os

class ImageSketchViewSet(viewsets.ViewSet):

    def list(self, request):
        instance = Image_model.objects.first()
        img = Image.open(instance.image.path) 
        sketch_img = img.filter(ImageFilter.FIND_EDGES)
        sketch_img_path = os.path.join(settings.MEDIA_ROOT, 'sketch.png')
        sketch_img.save(sketch_img_path)        
        temp_file_url = os.path.join(settings.MEDIA_URL, 'sketch.png')
        
        print("ok")
        
        
        return JsonResponse({'image_url': temp_file_url})



class ImageModelViewSet(viewsets.ModelViewSet):
    queryset = Image_model.objects.all()
    serializer_class = SketchSerializer
