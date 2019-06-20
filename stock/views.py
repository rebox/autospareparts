from django.shortcuts import render, render_to_response
from django.template import RequestContext
from .models import Brand, Type, Category, AutoCategory

# Create your views here.


def index(request):
    if request.method == 'GET':
        brands = Brand.objects.all()
        types = Type.objects.all()
        categories = Category.objects.all()
        autoCategories = AutoCategory.objects.all()

        context = {"brands": brands, "types": types, "categories": categories, "autoCategories": autoCategories}
        return render(request, 'index.html', context)

    return render_to_response('index.html', {},
                                  context_instance=RequestContext(request))