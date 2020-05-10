from rest_framework import serializers
from rest_framework.reverse import reverse as api_reverse
from ..models import Articles


class ArticlesSerialzer(serializers.ModelSerializer):
    detail_uri = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Articles
        fields = ['id', 'title', 'content', 'detail_uri']

    def get_detail_uri(self, instance):
        uri = api_reverse(
            viewname='api-detail', kwargs={"pk": instance.pk}, request=self.context.get('request'))
        return uri
