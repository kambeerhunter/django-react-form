from django.conf.urls import include
# from django.urls import path
from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'api'

router = DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'transfer/$', views.TransferView.as_view()),
]
