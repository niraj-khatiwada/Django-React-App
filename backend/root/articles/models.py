from django.db import models

class Articles(models.Model):
    title = models.CharField(max_length = 100)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add= True)
    last_updated = models.DateTimeField(auto_now= True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Article'
        verbose_name_plural = 'Articles'