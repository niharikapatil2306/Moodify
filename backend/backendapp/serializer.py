from rest_framework import serializers
from .models import *

class MoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mood
        fields = ['day', 'mood']