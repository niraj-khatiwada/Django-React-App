from django.urls import path
from . import views

urlpatterns = [
    path('', views.ArticleAPIView.as_view(), name='api-list'),
    path('<int:pk>/', views.ArticleDetailAPIView.as_view(), name='api-detail')
]
