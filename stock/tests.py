from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Product, Shipment
import json


class ProductTests(APITestCase):
    def test_list_product(self):
        """
        Ensure we can list existing products.
        """
        url = reverse('stock')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_create_product(self):
        """
        Ensure we can create a new product.
        """
        url = reverse('stock')
        data = {"code":"00006","model":"00006","brand":"0","type":"0","category":"0","autoCategory":"0","quantity":"1"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_edit_product(self):
        """
        Ensure we can edit a existing product.
        """
        url = reverse('stock_detail', kwargs={'pk': '1'})
        data = {"code":"000010","model":"000010","brand":"0","type":"0","category":"0","autoCategory":"0","quantity":"10"}
        response = self.client.put(url, json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ShipmentTests(APITestCase):
    def test_list_shipment(self):
        """
        Ensure we can list existing products.
        """
        url = reverse('shipment')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_create_shipment(self):
        """
        Ensure we can create a new shipment.
        """
        url = reverse('shipment')
        data = {"id": 1, "product": "00001", "quantity": "10", "name": "testing", "company": "testing", "address": "testing"}
        response = self.client.post(url, json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)