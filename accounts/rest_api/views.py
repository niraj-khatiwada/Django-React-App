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
            return response.Response({'info': 'You are already authenticated.', 'user': request.user.username}, status=400)
        username = request.data.get('username')
        try:
            obj = User.objects.get(username__iexact=username)
        except User.DoesNotExist:
            return response.Response({'detail': 'Username is not correct'})
        password = request.data.get('password')
        if not obj.check_password(password):
            return response.Response({'detail': 'Incorrect password'})
        user = authenticate(username=username.lower(), password=password)
        if user is None:
            return response.Response({'detail': 'Somthing went wrong while logging in. Try again'}, status=408)
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
