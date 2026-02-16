
from rest_framework.views import APIView
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from django.views.decorators.csrf import csrf_exempt
from .models import Catalogue
from core.models import WebsiteInfo
from .serializers import CatalogueSerializer

# Create your views here.
class CatalogueAPI(APIView):
    renderer_classes = [JSONRenderer]
    @csrf_exempt
    def get(self, request):
        item = Catalogue.objects.all()
        serializer = CatalogueSerializer(item, many=True)
        return Response(serializer.data)

def catalogue_old(request):
    website_info = WebsiteInfo.objects.first()
    item = Catalogue.objects.all()
    context = {
        'website_info': website_info,
        'items':item,
    }
    return render(request,'catalogue.html',context)

def catalogue_detail(request,id):
    website_info = WebsiteInfo.objects.first()
    item = Catalogue.objects.get(pk=id)
    context = {
        'website_info': website_info,
        'item':item,
    }
    return render(request,'catalogue-detail.html',context)

def catalogue(request):
    website_info = WebsiteInfo.objects.first()
    item = Catalogue.objects.all()
    context = {
        'website_info': website_info,
        'items':item,
    }
    return render(request,'catalogue.html',context)