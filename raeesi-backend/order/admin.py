from django.contrib import admin
from .models import Order,ProductOrder

# Register your models here.
class ProductOrderInline(admin.TabularInline):
    model = ProductOrder

class OrderAdmin(admin.ModelAdmin):
	list_display = ('order_uniqid','user','payment_status','order_status','updated_at','created_at')
	list_filter = ['order_status']
	list_editable = ['order_status',]
	inlines= [ProductOrderInline,]

class ProductOrderAdmin(admin.ModelAdmin):
	list_display = ('pk','order','order_status','quantity','updated_at','created_at')
	list_filter = ['order_status']
	list_editable = ['order_status',]

admin.site.register(Order,OrderAdmin)
admin.site.register(ProductOrder,ProductOrderAdmin)