from rest_framework import serializers
from food.models import Food, Donation
from authentication.models import CustomUser

class FoodSerializer_ForbulkUpload(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'


class DonationSerializer_ForbulkUpload(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = '__all__'


class AddFoodSerializer(serializers.ModelSerializer):
    donor = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Food
        fields = ['id', 'donor', 'name', 'foodType', 'quantity', 'unit', 'city', 'country', 'latitude', 'longitude', 'expiration_date', 'request_status', 'image']

    def create(self, validated_data):
        donor_username = validated_data.pop('donor')
        try:
            donor = CustomUser.objects.get(username=donor_username, userprofile__role='donor')
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError({"donor": "Donor not found or not authorized"})

        validated_data['donor'] = donor
        return Food.objects.create(**validated_data)

class FoodStatusUpdateSerializer(serializers.ModelSerializer):
    request_status = serializers.ChoiceField(choices=['accepted', 'rejected'])

    class Meta:
        model = Food
        fields = ['request_status']

class FoodListingSerializer(serializers.ModelSerializer):
    donor = serializers.CharField(source="donor.username", read_only=True)
    claimed = serializers.SerializerMethodField()
    claimedBy = serializers.SerializerMethodField()
    claimedAt = serializers.SerializerMethodField()

    class Meta:
        model = Food
        fields = [
            "id",
            "donor",
            "name",
            "foodType",
            "quantity",
            "unit",
            "city",
            "country",
            "latitude",
            "longitude",
            "expiration_date",
            "request_status",
            "image",
            "claimed",
            "claimedBy",
            "claimedAt",
        ]

    def get_claimed(self, obj):
        return Donation.objects.filter(food=obj, is_claimed=True).exists()

    def get_claimedBy(self, obj):
        donation = Donation.objects.filter(food=obj, is_claimed=True).first()
        return donation.charity.first_name+" "+donation.charity.last_name if donation else None

    def get_claimedAt(self, obj):
        donation = Donation.objects.filter(food=obj, is_claimed=True).first()
        return donation.claimed_at.strftime("%Y-%m-%d") if donation else None

class FoodClaimSerializer(serializers.ModelSerializer):
    charity = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Donation
        fields = ["food", "charity", "longitude", "latitude", "city", "country"]  # ✅ Added new fields

    def validate_food(self, value):
        """Ensure food is not already claimed."""
        if Donation.objects.filter(food=value, is_claimed=True).exists():
            raise serializers.ValidationError("This food item has already been claimed.")
        return value

    def create(self, validated_data):
        """Claim the food by creating a Donation record."""
        return Donation.objects.create(**validated_data, is_claimed=True)

class ClaimedFoodSerializer(serializers.ModelSerializer):
    foodName = serializers.CharField(source="food.name")
    foodType = serializers.CharField(source="food.foodType")
    quantity = serializers.IntegerField(source="food.quantity")
    unit = serializers.CharField(source="food.unit")
    city = serializers.CharField(source="food.city")
    country = serializers.CharField(source="food.country")
    latitude = serializers.FloatField(source="food.latitude")
    longitude = serializers.FloatField(source="food.longitude")
    expirationDate = serializers.DateField(source="food.expiration_date")
    claimedAt = serializers.DateTimeField(source="claimed_at")
    status = serializers.CharField(source="food.request_status")
    image = serializers.ImageField(source="food.image")
    class Meta:
        model = Donation
        fields = [
            "id",
            "foodName",
            "foodType",
            "quantity",
            "unit",
            "city",
            "country",
            "latitude",
            "longitude",
            "expirationDate",
            "status",
            "claimedAt", 
            "image"
        ]
        
class UnclaimedFoodListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id', 'name', 'foodType', 'quantity', 'unit', 'city', 'country', 'latitude', 'longitude', 'expiration_date', 'request_status', 'image']


class AdminFoodListingSerializer(serializers.ModelSerializer):
    donor_name = serializers.SerializerMethodField()
    donor_role = serializers.CharField(source='donor.userprofile.role', read_only=True)

    class Meta:
        model = Food
        fields = ['id', 'name', 'foodType', 'quantity', 'unit', 'expiration_date', 
                 'city', 'country', 'longitude', 'latitude', 'created_at', 
                 'request_status', 'image', 'donor', 'donor_name', 'donor_role']

    def get_donor_name(self, obj):
        return f"{obj.donor.first_name.capitalize()} {obj.donor.last_name.capitalize()}"

class AdminDonationListingSerializer(serializers.ModelSerializer):
    charity_name = serializers.SerializerMethodField()
    food_name = serializers.CharField(source='food.name', read_only=True)
    food_type = serializers.CharField(source='food.foodType', read_only=True)
    donor_name = serializers.SerializerMethodField()
    image = serializers.ImageField(source='food.image', read_only=True)

    class Meta:
        model = Donation
        fields = ['id', 'food_name', 'food_type', 'charity_name', 'donor_name', 'image', 'is_claimed', 'claimed_at']

    def get_charity_name(self, obj):
        return f"{obj.charity.first_name.capitalize()} {obj.charity.last_name.capitalize()}"

    def get_donor_name(self, obj):
        return f"{obj.food.donor.first_name.capitalize()} {obj.food.donor.last_name.capitalize()}"