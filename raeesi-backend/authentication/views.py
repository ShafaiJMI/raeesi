from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login, logout
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    CustomTokenObtainPairSerializer, SignupSerializer, 
    PasswordResetSerializer, PasswordChangeSerializer
)

User = get_user_model()  # 🔄 Correct way to get custom user model

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Account created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SigninView(APIView):
    def post(self, request):
        serializer = SigninSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)
            return Response({"message": "Logged in", "username": user.username})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logged out successfully"})


class ActivateView(APIView):
    def post(self, request, uid, token):
        try:
            user = User.objects.get(username=uid)
            # Token validation logic can be added here
            user.is_active = True
            user.save()
            return Response({"message": "Account activated"})
        except User.DoesNotExist:
            return Response({"error": "Invalid user"}, status=status.HTTP_404_NOT_FOUND)


class ResetPasswordView(APIView):
    def post(self, request, uid, token):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = User.objects.get(username=uid)
                user.set_password(serializer.validated_data['password'])
                user.save()
                return Response({"message": "Password reset successful"})
            except User.DoesNotExist:
                return Response({"error": "Invalid user"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    def post(self, request, uid, token):
        serializer = PasswordChangeSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = User.objects.get(username=uid)
                if not user.check_password(serializer.validated_data['oldpassword']):
                    return Response({"error": "Incorrect old password"}, status=status.HTTP_400_BAD_REQUEST)
                user.set_password(serializer.validated_data['password'])
                user.save()
                return Response({"message": "Password changed successfully"})
            except User.DoesNotExist:
                return Response({"error": "Invalid user"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
