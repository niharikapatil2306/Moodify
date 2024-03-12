from django.db import models

class Mood(models.Model):
    day = models.DateField(auto_now_add=False, auto_now=False)
    mood = models.CharField(max_length=250)