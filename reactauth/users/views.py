from  rest_framework import generics, permissions
from .serializers import RegisterSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CustomUser as User
# Create your views here.
user = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = user.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['GET'])
def get_major_choices(request):
    choices = [
        {"value": choice[0], "label": choice[1]}
        for choice in User.MAJOR_CHOICES
    ]
    return Response(choices)