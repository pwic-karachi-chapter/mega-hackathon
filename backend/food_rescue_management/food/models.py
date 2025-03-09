from django.db import models
from django.conf import settings

class Food(models.Model):
    REQUEST_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]
	
    FOOD_TYPE_CHOICES = [
        ('meal', 'Meal'),
        ('fruit', 'Fruit'),
        ('meat', 'Meat'),
        ('bakery', 'Bakery'),
    ]
    
    UNIT_CHOICES = [
        ('kg', 'Kg'),
        ('box', 'Box'),
        ('litre', 'Litre'),
        ('dozen', 'Dozen'),
    ]
    donor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'role': 'donor'})
    name = models.CharField(max_length=255)
    foodType = models.CharField(max_length=10, choices=FOOD_TYPE_CHOICES)
    quantity = models.IntegerField()
    unit = models.CharField(max_length=20, choices=UNIT_CHOICES)
    expiration_date = models.DateField()
    city = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    longitude = models.CharField(max_length=255)
    latitude = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    request_status = models.CharField(max_length=20, choices=REQUEST_STATUS_CHOICES, default='pending')

    def __str__(self): 
        return f"{self.name} ({self.quantity} units)"


class Donation(models.Model):
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    charity = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'role': 'charity'})
    claimed_at = models.DateTimeField(auto_now_add=True)
    is_claimed = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Donation {self.food_listing.name} to {self.charity.username}"