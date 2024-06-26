from rest_framework import serializers
from .models import *

class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplyLeave
        fields = '__all__'
        






class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

