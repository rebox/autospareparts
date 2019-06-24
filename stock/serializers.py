from .models import Product, Shipment
from rest_framework import serializers

"""
Serializer for Product to get the request data and create a new instance
"""
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'code', 'model', 'brand', 'type', 'category', 'autoCategory', 'quantity')

"""
Serializer for Shipment to get the request data and create a new instance
"""
class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = ('id','product', 'quantity', 'name', 'company', 'address')
