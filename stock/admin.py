from django.contrib import admin

# Register your models here.

from .models import Product, Brand, Type, Category, AutoCategory

admin.site.register(Product)
admin.site.register(Brand)
admin.site.register(Type)
admin.site.register(Category)
admin.site.register(AutoCategory)
