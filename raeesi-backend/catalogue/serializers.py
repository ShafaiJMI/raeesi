from rest_framework import serializers
from .models import Catalogue, CatalogueImage

# Serializers define the API representation.
class CatalogueImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogueImage
        fields = "__all__"

class CatalogueSerializer(serializers.ModelSerializer):
    images = CatalogueImageSerializer(many=True, read_only=True, source='catalogueimage_set')
    class Meta:
        model = Catalogue
        fields = ['title','featured','description','images']