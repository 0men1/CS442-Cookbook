from django.urls import path
from .views import PostsView, UserPostsView

urlpatterns = [
    path('', PostsView.as_view()),
    path('<uuid:id>/', PostsView.as_view()),
    path('user/<str:username>/', UserPostsView.as_view()),
    path('user/<uuid:id>/', UserPostsView.as_view()),
]
