from rest_framework import generics, mixins
from .serializers import ArticlesSerialzer
from ..models import Articles


class ArticleAPIView(mixins.CreateModelMixin, generics.ListAPIView):
    serializer_class = ArticlesSerialzer
    queryset = Articles.objects.all()

    def get_serializer_context(self):
        return {'request': self.request}

    def post(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)


class ArticleDetailAPIView(generics.RetrieveAPIView):
    serializer_class = ArticlesSerialzer
    queryset = Articles.objects.all()
    lookup_field = 'pk'
