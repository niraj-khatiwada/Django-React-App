from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Token(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=255, default=None)
    logged_in = models.DateField(auto_now=True)

    def __str__(self):
        return self.user.username
