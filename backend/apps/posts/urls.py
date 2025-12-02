from django.urls import path
from .views import PostsView, UserPostsView, PostCommentView, PostLikeView

urlpatterns = [
    path('', PostsView.as_view()),
    path('<uuid:id>/', PostsView.as_view()),
    path('user/<str:username>/', UserPostsView.as_view()),
    path('<uuid:post_id>/comment/', PostCommentView.as_view()),
    path('<uuid:post_id>/like/', PostLikeView.as_view()),
    path('user/<uuid:id>/', UserPostsView.as_view()),
]
