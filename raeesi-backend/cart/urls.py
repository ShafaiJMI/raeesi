from django.urls import path
from . import views
from .cartapi import CartAPI

urlpatterns = [
    path("api/cart-list/",CartAPI.as_view(),name="cart-list-api"),
    path("api/add-to-cart/<int:product_pk>/",CartAPI.as_view(),name="add-to-cart"),
    path("api/update-cart-item/<int:product_pk>/",CartAPI.as_view(),name="update-cart-item"),
    path("api/remove-cart-item/<int:product_pk>/",CartAPI.as_view(),name="remove-cart-item"),
    ]