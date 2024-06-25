"""
ASGI config for main project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""
import os
from django.core.asgi import get_asgi_application
from app.consumers import *
from django.urls import path
from channels.routing import ProtocolTypeRouter, URLRouter



os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')

django_asgi_app = get_asgi_application()


websocket_urlpatterns = [
    path('ws/app/', MyConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
    'http': django_asgi_app,  
    'websocket': URLRouter(websocket_urlpatterns)
    

})

