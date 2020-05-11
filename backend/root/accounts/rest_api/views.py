from rest_framework import generics, mixins
from . import serilaizers
from django.contrib.auth.models import User


class AccountAPIRegisterView(mixins.CreateModelMixin, generics.ListAPIView):
    serializer_class = serilaizers.AccountSerializer
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)