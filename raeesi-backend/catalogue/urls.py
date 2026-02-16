"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from . import views

urlpatterns = [
    path("api/catalogue/",views.CatalogueAPI.as_view(),name="catalogue-list"),
    path("api/catalogue/<int:id>/",views.CatalogueAPI.as_view(),name="catalogue-detail"),
    #path("catalogue/",views.catalogue,name="catalogue"),
    #path("catalogue/<id>/",views.catalogue_detail,name="catalogue-detail"),
]
