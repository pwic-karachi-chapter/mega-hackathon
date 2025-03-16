import os
import django

# Set up Django settings manually
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "food_rescue_management.settings")
django.setup()

from food.models import Food
from django.contrib.auth.models import User
import pandas as pd

# Load the Excel file
file_path = r"C:\Users\pc\Downloads\food_donations.xlsx"  # Update the path
df = pd.read_excel(file_path)

# Insert data into the Food model
for index, row in df.iterrows():
    try:
        donor = User.objects.get(id=row['donor'])  # Ensure donor exists
        
        Food.objects.create(
            donor=donor,
            foodType=row['foodType'],
            quantity=row['quantity'],
            city=row['city'],
            expiration_date=row['expiration_date'],
            latitude=row['latitude'],
            longitude=row['longitude']
        )
        print(f"Added food donation {row['foodType']}")

    except Exception as e:
        print(f"Error at row {index}: {e}")
