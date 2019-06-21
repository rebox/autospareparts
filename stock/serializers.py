from .models import Product, Shipment
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'code', 'model', 'brand', 'type', 'category', 'autoCategory', 'quantity')


class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = ('id','product', 'quantity', 'name', 'company', 'address')