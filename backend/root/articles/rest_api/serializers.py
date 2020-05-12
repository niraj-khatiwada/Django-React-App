from rest_framework import serializers
from rest_framework.reverse import reverse as api_reverse
from ..models import Articles
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', ]


class ArticlesSerialzer(serializers.ModelSerializer):
    detail_uri = serializers.SerializerMethodField(read_only=True)
    user = UserSerializer(read_only=True)
    is_owner = serializers.SerializerMethodField()

    class Meta:
        model = Articles
        fields = ['id', 'user', 'title', 'content', 'detail_uri',  'is_owner']
        read_only_fields = ['user']

    def get_detail_uri(self, instance):
        uri = api_reverse(
            viewname='api-detail', kwargs={"pk": instance.pk}, request=self.context.get('request'))
        return uri

    def get_is_owner(self, instance):
        request = self.context.get('request')
        return request.user == instance.user
