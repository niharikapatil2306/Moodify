from django.urls import path
from .views import *

urlpatterns = [
    path('mood', MoodView.as_view())
]