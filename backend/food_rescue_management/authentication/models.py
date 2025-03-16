from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

FOOD_PREFERENCE_CHOICES = [
    ("VEG", "Vegetarian"),
    ("NON_VEG", "Non-Vegetarian"),
    ("VEGAN", "Vegan"),
]

class CustomUser(AbstractUser):
    pass

class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='userprofile')    
    ROLE_CHOICES = [
        ('donor', 'Donor'),
        ('charity', 'Charity'),
        ('admin', 'Admin'),
    ]
    food_preference = models.CharField(max_length=255, choices=FOOD_PREFERENCE_CHOICES, default= ("VEG", "Vegetarian"))
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='donor')    
    def __str__(self):
        return self.user.username
