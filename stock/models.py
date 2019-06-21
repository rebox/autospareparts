from django.db import models

# Create your models here.


class Brand(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Type(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class AutoCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Product(models.Model):
    code = models.CharField(max_length=100)
    model = models.CharField(max_length=10)
    brand = models.ForeignKey(Brand, models.SET_NULL, blank=True, null=True)
    type = models.ForeignKey(Type, models.SET_NULL, blank=True, null=True)
    category = models.ForeignKey(Category, models.SET_NULL, blank=True, null=True)
    autoCategory = models.ForeignKey(AutoCategory, models.SET_NULL, blank=True, null=True)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return self.code


class Shipment(models.Model):
    product = models.ForeignKey(Product, models.SET_NULL, blank=True, null=True)
    quantity = models.IntegerField(default=0)
    name = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    address = models.CharField(max_length=100)

    def __str__(self):
        return self.product


