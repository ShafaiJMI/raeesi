from django.shortcuts import render
from .models import FeaturedImage, Banner
from category.models import Category
from product.models import Product

# Create your views here.
def landing_page(request):
    banner = Banner.objects.all()
    category= Category.objects.all()
    featured_products = Product.objects.filter(status=True,featured=True)[:5]
    new_arrivals = Product.objects.order_by('created_at')[:5]
    featuredimages = FeaturedImage.objects.all()
    context = {
        'page_title' : 'Tots World',
        'banners':banner,
        'categories':category,
        'featured_images':featuredimages,
        'featured_products':featured_products,
        'new_arrivals':new_arrivals,
        }
    return render(request, 'home.html',context=context)