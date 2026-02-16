from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser  # kUsing custom model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        data['email'] = self.user.email
        return data


class SignupSerializer(serializers.ModelSerializer):
    cpassword = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'first_name', 'last_name', 'password', 'cpassword']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['cpassword']:
            raise serializers.ValidationError("Passwords do not match")
        if len(data['username']) > 15 or not data['username'].isalnum():
            raise serializers.ValidationError("Username must be alphanumeric and ≤ 15 characters")
        if CustomUser.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError("Username already exists")
        if CustomUser.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("Email already in use")
        return data

    def create(self, validated_data):
        validated_data.pop('cpassword')
        return CustomUser.objects.create_user(**validated_data)


class PasswordChangeSerializer(serializers.Serializer):
    oldpassword = serializers.CharField()
    password = serializers.CharField()


class PasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField()
