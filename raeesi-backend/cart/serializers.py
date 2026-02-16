from rest_framework import serializers
from .models import Cart
from product.models import Product

# Serializers define the API representation.
class  ProductSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ['title','thumbnail','category','price']
    
    def get_thumbnail(self,obj):
        request = self.context.get('request')
        thumbnail_queryset = obj.get_thumbnail  # Assuming get_thumbnail() returns a queryset of ProductImage objects
        if thumbnail_queryset:
            first_thumbnail_url = thumbnail_queryset.first().image.url
            return first_thumbnail_url
        else:
            return ""


class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['product','quantity','total_price']

    def get_total_price(self,obj):
        return obj.get_item_total_price
