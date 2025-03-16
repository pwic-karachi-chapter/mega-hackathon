import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "food_rescue_management.settings")

django.setup()

import joblib
import pandas as pd
from food.models import Donation, Food
from django.core.exceptions import ObjectDoesNotExist

# Fetch donation data
def get_donation_data():
    donations = Donation.objects.select_related("food", "charity").values(
        "food__name", "charity__userprofile__food_preference"
    )
    return pd.DataFrame(donations)

# Train a simple recommendation model
def train_recommendation_model():
    df = get_donation_data()

    if df.empty:
        print("No donation data available for training.")
        return

    # Create rules: Group food by charity preference
    recommendation_rules = df.groupby("charity__userprofile__food_preference")["food__name"].apply(list).to_dict()

    # Save the trained model
    joblib.dump(recommendation_rules, "food/ml/recommendation_model.pkl")
    print("Recommendation model trained and saved successfully!")

# Run training
if __name__ == "__main__":
    train_recommendation_model()
