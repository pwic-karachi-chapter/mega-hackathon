import pandas as pd
from food.models import Food, Donation
from django.contrib.auth import get_user_model

User = get_user_model()

def export_data():
    data = []
    for donation in Donation.objects.select_related('food', 'charity'):
        data.append({
            "food_id": donation.food.id,
            "food_type": donation.food.foodType,
            "expiration_date": donation.food.expiration_date,
            "city": donation.food.city,
            "country": donation.food.country,
            "latitude": donation.food.latitude,
            "longitude": donation.food.longitude,
            "charity_id": donation.charity.id,
"charity_preference": getattr(donation.charity.profile, "food_preference", "Not Specified")
 if hasattr(donation.charity, "profile") else "Not Specified"

        })

    df = pd.DataFrame(data)
    df.to_csv("charity_food_data.csv", index=False)
    print("Data exported successfully!")
