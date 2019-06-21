from django.urls import path
from .api import ProductList, ProductDetail, ShipmentList


urlpatterns = [
    path(r'stock/', ProductList.as_view(), name="stock"),
    path(r'stock/<int:pk>/', ProductDetail.as_view(), name="stock_detail"),
    path(r'shipment/', ShipmentList.as_view(), name="shipment")
]