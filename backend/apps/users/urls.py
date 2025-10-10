from rest_framework import routers
from django.urls import path
from apps.users.views import UserView

urlpatterns = [
    path('', UserView.as_view()),
]
