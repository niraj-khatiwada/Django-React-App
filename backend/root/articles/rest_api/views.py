from rest_framework import generics, mixins
from .serializers import ArticlesSerialzer
from ..models import Articles
from accounts.rest_api.permissions import IsOwnerOrReadOnly


class ArticleAPIView(mixins.CreateModelMixin, generics.ListAPIView):
    serializer_class = ArticlesSerialzer
    queryset = Articles.objects.all()

    def get_serializer_context(self):
        return {'request': self.request}

    def post(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        return serializer


class ArticleDetailAPIView(mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.RetrieveAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = ArticlesSerialzer
    queryset = Articles.objects.all()
    lookup_field = 'pk'

    def put(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    def get_serializer_context(self):
        return {'request': self.request}
