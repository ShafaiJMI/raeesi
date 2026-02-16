from django.contrib import admin
from .models import (UserAddress,ReportIssue,Setting,Review,
    Referral,Banner,FeaturedImage,WebsiteInfo)
#Register your models here.

@admin.register(WebsiteInfo)
class WebsiteInfoAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # Allow adding only if there is no existing instance
        return not WebsiteInfo.objects.exists()

    def has_delete_permission(self, request, obj=None):
        # Disallow deleting the only instance
        return False

class UserAddressAdmin(admin.ModelAdmin):
    list_display = ['fullname','user','pin','default_address','created_at']

admin.site.register(UserAddress,UserAddressAdmin)
#admin.site.register(Payment)
admin.site.register(ReportIssue)
admin.site.register(Setting)
admin.site.register(Review)
#admin.site.register(Wishlist)
admin.site.register(Referral)
admin.site.register(Banner)
admin.site.register(FeaturedImage)