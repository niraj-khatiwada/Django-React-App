from rest_framework import generics, mixins, views, response, permissions
from . import serilaizers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_jwt.settings import api_settings
from .utils import jwt_response_payload_handler
from ..models import Token

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER


class ObtainTokenView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return response.Response({'info': 'You are already authenticated.'}, status=400)
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        res = jwt_response_payload_handler(
            token=token, user=user, request=self.request)
        store_token = Token(user=user, token=token)
        store_token.save()
        return response.Response(res, status=200)


class AccountAPIRegisterView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = serilaizers.AccountSerializer
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
