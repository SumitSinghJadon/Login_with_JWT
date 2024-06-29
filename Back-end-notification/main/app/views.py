from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets
from .models import *
from .serializers import LeaveSerializer,LoginSerializer,ObDetailSerializer


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
        
        


class ExcelDataShowViewSet(viewsets.ViewSet):
        def create(self, request):
            headers = request.data.get('header')
            colValue = request.data.get('sendData')
            
            print("headers =",headers)
            try:
                instances = []
                
                for col in colValue:
                    data_dict = dict(zip(headers, col))
                
                    # Extract specific fields for serializer initialization
                    ob_no = data_dict.get('S/N')
                    parts = data_dict.get('Parts')
                    operation = data_dict.get('Operation')
                    type_of_machine = data_dict.get('Type of Machine')
                    attachments = data_dict.get('Attachments')
                    sam = data_dict.get('SAM')
                    theoretical_manpower = data_dict.get('Theoretical Manpower')
                    planned_work_station = data_dict.get('Planned Work Station')
                    target_100_pcs = data_dict.get('Target @ 100% PCs/Hr')
                    target_60_pcs = data_dict.get('Target @ 60% PCs/Hr')
                    
                    # Create serializer instance with extracted fields
                    serializer = ObDetailSerializer(data={
                        'ob_no': ob_no,
                        'parts': parts,
                        'operation': operation,
                        'type_of_machine': type_of_machine,
                        'attachments': attachments,
                        'sam': sam,
                        'theoretical_manpower': theoretical_manpower,
                        'planned_work_station': planned_work_station,
                        'target_100_pcs': target_100_pcs,
                        'target_60_pcs': target_60_pcs,
                    })
                
                    
                    # Validate and save serializer instance
                    serializer.is_valid(raise_exception=True)
                    instance = serializer.save()
                    
                    instances.append(instance)
                    
                    print("data_dict",data_dict)
                    
                    
                return Response({"message": "Data saved successfully"})
            
            except Exception as e:
                return Response({"error": str(e)}, status=400)
                #     for val, head in zip(col, headers):
                #         print("val =",val,"head =",head)
                #         dic[head]=val                   
                #     print("================")              
                # print("dic",dic)
                    
            
                    
                        
             
            
            
      
            # Perform any processing you need with headers and colValue
            
            # Assuming you want to return them back for now
            return Response({'headers': headers, 'sendData': colValue})