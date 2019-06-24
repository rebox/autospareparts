from .serializers import ProductSerializer, ShipmentSerializer
from .models import Product, Shipment
from rest_framework import generics


class ProductList(generics.ListCreateAPIView):
    '''
    class to be used as view,
    on POST create a new product, on GET list all the products
    '''
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    '''
    class to be used as view, a product ID is required as parameter
    on GET retrieve a product corresponding to the ID,
    on PUT update a product corresponding to the ID,
    on DELETE delete a product corresponding to the ID
    '''
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ShipmentList(generics.ListCreateAPIView):
    '''
    class to be used as view,
    on POST create a new shipment, on GET list all the shipments
    '''
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer
