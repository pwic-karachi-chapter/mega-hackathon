from rest_framework import status, generics, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateAPIView
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from .models import Food, Donation
from authentication.models import CustomUser
from .serializers import FoodSerializer, FoodStatusUpdateSerializer, FoodListingSerializer, FoodClaimSerializer, ClaimedFoodSerializer, UnclaimedFoodListSerializer, AdminFoodListingSerializer, AdminDonationListingSerializer

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

class AdminFoodListAPIView(generics.ListAPIView):
    serializer_class = AdminFoodListingSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = {
        'request_status': ['exact'],
        'donor__username': ['exact', 'contains'],  
        'created_at': ['exact', 'gte', 'lte', 'gt', 'lt'],
        'expiration_date': ['exact', 'gte', 'lte', 'gt', 'lt'],
        'foodType': ['exact'],
    }
    ordering_fields = ['created_at', 'expiration_date']
    pagination_class = PageNumberPagination
    
    def get_queryset(self):
        queryset = Food.objects.all()
        
        # Get filter parameters from query string
        request_status = self.request.query_params.get('request_status')
        food_type = self.request.query_params.get('food_type')
        username = self.request.query_params.get('username')
        role = self.request.query_params.get('role')
        
        # Apply filters if parameters are provided
        if request_status:
            queryset = queryset.filter(request_status=request_status)
        
        if username:
            queryset = queryset.filter(donor__username=username)
            
        if role:
            queryset = queryset.filter(donor__userprofile__role=role)

        if food_type:
            queryset = queryset.filter(foodType=food_type)
        
        return queryset

class AdminDonationListAPIView(generics.ListAPIView):
    serializer_class = AdminDonationListingSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    
    filterset_fields = {
        'is_claimed': ['exact'],  
        'claimed_at': ['exact', 'gte', 'lte', 'gt', 'lt'],
        'charity__username': ['exact', 'contains'],  
        'food__name': ['exact', 'contains'],  
        'food__donor__username': ['exact', 'contains'],  
        'food__foodType': ['exact']  # ✅ Corrected field name
    }
    
    search_fields = [
        'charity__username',
        'food__name',
        'food__donor__username', 
    ]

    ordering_fields = ['claimed_at']
    pagination_class = PageNumberPagination
    
    def get_queryset(self):
        queryset = Donation.objects.all()
        
        is_claimed = self.request.query_params.get('is_claimed')
        charity_username = self.request.query_params.get('charity_username')
        donor_username = self.request.query_params.get('donor_username')
        food_name = self.request.query_params.get('food_name')
        food_type = self.request.query_params.get('food_type')

        if is_claimed is not None:
            queryset = queryset.filter(is_claimed=is_claimed)

        if charity_username:
            queryset = queryset.filter(charity__username=charity_username)
        
        if donor_username:
            queryset = queryset.filter(food__donor__username=donor_username)
        
        if food_name:
            queryset = queryset.filter(food__name__icontains=food_name)

        if food_type:
            queryset = queryset.filter(food__foodType__icontains=food_type)  # ✅ Corrected field reference

        return queryset