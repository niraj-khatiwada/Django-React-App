from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('obtain-jwt-auth/', obtain_jwt_token),
    path('register/', views.AccountAPIRegisterView.as_view(), name='register')
]
