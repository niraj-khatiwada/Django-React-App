from rest_framework import serializers
from django.contrib.auth.models import User


class AccountSerializer(serializers.ModelSerializer):
    password1 = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password1']
        extra_kwargs = {'password1': {'write_only': True}}

    def validate(self, attrs):
        password = attrs.get('password')
        password1 = attrs.pop('password1')
        if password != password1:
            raise serializers.ValidationError(
                'Passwords do not match. Try again')
        return attrs

    def create(self, validated_data):
        pass

    def get_password1(self, instance):
        print(instance)
        # return instance.get('password1')
        pass
