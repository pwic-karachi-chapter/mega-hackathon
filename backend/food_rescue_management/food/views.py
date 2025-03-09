from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateAPIView
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import Food, Donation
from authentication.models import CustomUser
from .serializers import FoodSerializer, FoodStatusUpdateSerializer, FoodListingSerializer, FoodClaimSerializer, ClaimedFoodSerializer, UnclaimedFoodListSerializer

class AddFoodView(APIView):
    permission_classes = [IsAuthenticated] 

    def post(self, request):
        if request.user.userprofile.role != 'donor':
            return Response({"error": "Only donors can add food."}, status=status.HTTP_403_FORBIDDEN)

        data = request.data.copy()
        data["donor"] = request.user.id 

        serializer = FoodSerializer(data=data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateFoodStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, food_id):
        if request.user.userprofile.role != 'admin':
            return Response({"error": "Only admins can update the food status."}, status=status.HTTP_403_FORBIDDEN)

        try:
            food = Food.objects.get(id=food_id)
        except Food.DoesNotExist:
            return Response({"error": "Food item not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = FoodStatusUpdateSerializer(food, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": f"Food status updated to {serializer.validated_data['request_status']}"}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DonorFoodListView(generics.ListAPIView):
    serializer_class = FoodListingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Food.objects.filter(donor=self.request.user)

class ClaimFoodAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, food_id):
        food = get_object_or_404(Food, id=food_id, request_status='accepted')

        serializer = FoodClaimSerializer(data={"food": food.id}, context={"request": request})
        if serializer.is_valid():
            donation = serializer.save()
            return Response({'message': 'Food claimed successfully', 'donation': FoodClaimSerializer(donation).data}, status=201)

        return Response(serializer.errors, status=400)

class ClaimedFoodListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ClaimedFoodSerializer

    def get_queryset(self):
        queryset = Donation.objects.filter(
            charity=self.request.user, 
            is_claimed=True 
        )
        return queryset

class CancelClaimAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, food_id):
        charity = request.user
        donation = get_object_or_404(Donation, food__id=food_id, charity=charity, is_claimed=True, food__request_status='approved')
        donation.delete()
        return Response({'message': 'Food claim canceled successfully'})

class UnclaimedFoodListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UnclaimedFoodListSerializer

    def get_queryset(self):
        if self.request.user.userprofile.role != 'charity':
            return Food.objects.none()

        claimed_food_ids = Donation.objects.values_list('food_id', flat=True)
        return Food.objects.filter(request_status__iexact='accepted').exclude(id__in=claimed_food_ids)

class EditFoodAPIView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FoodSerializer
    queryset = Food.objects.all()

    def get_object(self):
        """Ensure only the donor who added the food can edit it"""
        food_id = self.kwargs.get("food_id")
        food = get_object_or_404(Food, id=food_id, donor=self.request.user)
        return food

    def update(self, request, *args, **kwargs):
        """Handle partial updates using PATCH"""
        food = self.get_object()
        serializer = self.get_serializer(food, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Food updated successfully", "data": serializer.data}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteFoodAPIView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Food.objects.all()

    def get_object(self):
        """Ensure only the donor who added the food can delete it"""
        food_id = self.kwargs.get("food_id")
        return get_object_or_404(Food, id=food_id, donor=self.request.user)

    def delete(self, request, *args, **kwargs):
        """Delete the food item"""
        food = self.get_object()
        food.delete()
        return Response({"message": "Food deleted successfully"}, status=status.HTTP_200_OK)