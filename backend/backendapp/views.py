from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializer import *

class MoodView(APIView):
    def get(self, request):
        data = Mood.objects.all()
        serializer = MoodSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self,request):
        data = {
                'day' : request.data.get('day'),
                'mood' : request.data.get('mood'),
            }
        existing_mood = Mood.objects.filter(day=data['day']).first()
        if existing_mood: 
            serializer = MoodSerializer(existing_mood, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        else:
            serializer = MoodSerializer(data=data)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)