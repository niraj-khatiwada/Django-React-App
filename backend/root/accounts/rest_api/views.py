from rest_framework import generics, mixins, views, response, permissions
from . import serilaizers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_jwt.settings import api_settings
from .utils import jwt_response_payload_handler
from django.db.models import Q

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER


class ObtainTokenView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return response.Response({'info': 'You are already authenticated'}, status=400)
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        res = jwt_response_payload_handler(
            token=token, user=user, request=self.request)
        return response.Response(res, status=200)


class AccountAPIRegisterView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return response.Response({'info': 'You are already authenticated'}, status=400)
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        password1 = request.data.get('password1')
        qs = User.objects.filter(
            Q(username__iexact=username) | Q(username__iexact=username))
        if qs.exists():
            return response.Response({'error': 'Account is already taken'})
        else:
            if password != password1:
                return response.Response({'error': "Password do not match"})
            user = User.objects.create(username=username, email=email)
            user.set_password(password)
            user.save()
            return response.Response({'info': 'Account created succesfully. You can now log in.'}, status=200)
        return response.Response({'error': 'Something went wrong. Please try again'})
