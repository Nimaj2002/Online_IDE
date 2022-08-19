from django.urls import path

from .views import IDEmain

urlpatterns = [
    path('', IDEmain),
]
