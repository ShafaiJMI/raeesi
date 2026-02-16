from django.contrib import admin
from .models import Catalogue,CatalogueImage

# Register your models here.
class CatalogueImageInline(admin.TabularInline):
    model = CatalogueImage
    
class CatalogueAdmin(admin.ModelAdmin):
    list_display = ['title','featured',]
    inlines = [CatalogueImageInline]

admin.site.register(CatalogueImage)
admin.site.register(Catalogue,CatalogueAdmin)