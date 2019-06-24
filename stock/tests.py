from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Brand, Type, Category, AutoCategory, Product, Shipment
import json

'''
Class to test the functionality of products:
create, update and list
'''
class ProductTests(APITestCase):
    def setUp(self):
        brand = Brand.objects.create(name='Tests Brand')
        type = Type.objects.create(name='Tests Type')
        category = Category.objects.create(name='Tests Category')
        autoCategory = AutoCategory.objects.create(name='Tests AutoCategory')

        product = Product.objects.create(code = "00001",
                                            model = "00001",
                                            brand = brand,
                                            type = type,
                                            category = category,
                                            autoCategory = autoCategory,
                                            quantity=1)

        self.product = {
            "code":"00001",
            "model":"00001",
            "brand":"1",
            "type":"1",
            "category":"1",
            "autoCategory":"1",
            "quantity":"1"
        }

        self.product_edit = {
            "code":"00002",
            "model":"00002",
            "brand":"1",
            "type":"1",
            "category":"1",
            "autoCategory":"1",
            "quantity":"2"
        }


    def test_create_product(self):
        """
        Ensure we can create a new product.
        """
        url = reverse('stock')
        data = self.product
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_edit_product(self):
        """
        Ensure we can edit a existing product.
        """
        product = Product.objects.get(code='00001')
        print("product: " + str(product.id))

        url = reverse('stock_detail', kwargs={'pk': product.id})
        print("url: " + str(url))
        data = data = self.product_edit
        response = self.client.put(url, json.dumps(data), content_type='application/json')
        print("reponse.data: " + str(response.data))
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_list_product(self):
        """
        Ensure we can list existing products.
        """
        url = reverse('stock')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


'''
Class to test the functionality of shipments:
create and list
'''
class ShipmentTests(APITestCase):
    def setUp(self):
        brand = Brand.objects.create(name='Tests Brand')
        type = Type.objects.create(name='Tests Type')
        category = Category.objects.create(name='Tests Category')
        autoCategory = AutoCategory.objects.create(name='Tests AutoCategory')

        product = Product.objects.create(code = "00001",
                                            model = "00001",
                                            brand = brand,
                                            type = type,
                                            category = category,
                                            autoCategory = autoCategory,
                                            quantity=1)

        self.shipment = {
            "product": product.id,
            "quantity": "1",
            "name": "Test ship",
            "company": "Company test",
            "address": "asdfasdfasdf"
        }


    def test_create_shipment(self):
        """
        Ensure we can create a new shipment.
        """
        url = reverse('shipment')
        data = self.shipment
        response = self.client.post(url, json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_list_shipment(self):
        """
        Ensure we can list existing products.
        """
        url = reverse('shipment')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
