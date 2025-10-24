from django.urls import path
from .views import PostsView

urlpatterns = [
	# path('login/', UserLoginView.as_view(), name='user-login'),
	path("", PostsView.as_view(), name="POSTS"),
]

