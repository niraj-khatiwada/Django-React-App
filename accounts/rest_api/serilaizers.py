from rest_framework import serializers
from django.contrib.auth.models import User
from .utils import jwt_response_payload_handler
from rest_framework_jwt.settings import api_settings
from ..models import Token

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class AccountSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    message = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email',
                  'password', 'password1', 'message']
        extra_kwargs = {'password1': {'write_only': True},
                        'password': {'write_only': True}}

    def validate(self, attrs):
        password = attrs.get('password')
        password1 = attrs.pop('password1')
        if password != password1:
            raise serializers.ValidationError(
                'Passwords do not match. Try again')
        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def get_message(self, obj):
        return 'Succesfully created an account. You are now able to log in.'
