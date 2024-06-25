from rest_framework import routers
from .views import *
from django.urls import path,include

router = routers.DefaultRouter()
router.register(r'ApplyLeave', LeaveViewSet)
router.register(r'ChartData', ChartDataViewSet,basename="ChartData")
router.register(r'sketchimage', ImageSketchViewSet, basename='sketch-image')
router.register(r'images', ImageModelViewSet, basename='image-model')

urlpatterns = [
    path('', include(router.urls))
]