from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets
from .models import *
from .serializers import LeaveSerializer,LoginSerializer


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import status,permissions



# Create your views here.


class LeaveViewSet(viewsets.ModelViewSet):
    
    queryset = ApplyLeave.objects.all()
    serializer_class = LeaveSerializer
    permission_classes = [permissions.IsAuthenticated]
    
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
        


class LoginApi(APIView):
     
    def post(self , request ):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = request.data.get('username')
            password = request.data.get('password')
            
        
            user = authenticate(username=username, password=password)
            
            print("user =",user)
            
            if user is not None:
                refresh = RefreshToken.for_user(user)
                print("refresh =",refresh)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
            else:
                return Response({'error': 'Invalid credentials'}, status=400)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)