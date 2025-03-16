from django.urls import path, include
from .views import RecommendationViewSet, DonationViewSet,FoodViewSet,AddFoodView, UpdateFoodStatusView, DonorFoodListView, ClaimFoodAPIView , ClaimedFoodListAPIView, CancelClaimAPIView, UnclaimedFoodListAPIView, EditFoodAPIView, DeleteFoodAPIView, AdminFoodListAPIView, AdminDonationListAPIView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'food', FoodViewSet, basename='food')
router.register(r'donations', DonationViewSet) 
router.register(r'recommendations', RecommendationViewSet, basename="recommendations")

urlpatterns = [
    path('', include(router.urls)),
    path('donations/generate_fake_charities/', DonationViewSet.as_view({'post': 'generate_fake_charities'}), name='generate_fake_charities'),
    path('recommendations/recommend_foods_for_charity/', RecommendationViewSet.as_view({'post': 'recommend_foods_for_charity'}), name='recommend_foods_for_charity'),
    path('food/generate_fake_donations/', FoodViewSet.as_view({'post': 'generate_fake_donations'}), name='generate_fake_donations'),
    path('add-food/', AddFoodView.as_view(), name='add-food'), #donor will add the food
    path('update-food-status/<int:food_id>', UpdateFoodStatusView.as_view(), name='update-food-status'), #admin will update the food status
    path("donor-food-listing/", DonorFoodListView.as_view(), name="donor-food-listing"), #List the food added by donor
    path("charity/claim-food/<int:food_id>", ClaimFoodAPIView.as_view(), name="claimed-food-list"), #cahrity will claim the food
    path("charity/claimed-food/", ClaimedFoodListAPIView.as_view(), name="donor-food-listing"), #List the food added by donor
    path("cancel-claim/<int:food_id>", CancelClaimAPIView.as_view(), name="cancel-claim"), #charity will cancel the food
    path('charity/unclaimed-food/', UnclaimedFoodListAPIView.as_view(), name='unclaimed-food'), #charity has the list of all the unclaimed food
    path('donor/edit-food/<int:food_id>', EditFoodAPIView.as_view(), name='edit-food'), #donor will edit the food
    path('donor/delete-food/<int:food_id>', DeleteFoodAPIView.as_view(), name='delete-food'), #donor will delete the food
    path('foods/', AdminFoodListAPIView.as_view(), name='admin-food-list'),
    path('donations/', AdminDonationListAPIView.as_view(), name='admin-donation-list'),
]
