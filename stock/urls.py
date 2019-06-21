from django.urls import path
from .api import ProductList, ProductDetail


urlpatterns = [
    path(r'stock/', ProductList.as_view()),
    path(r'stock/<int:pk>/', ProductDetail.as_view()),
]