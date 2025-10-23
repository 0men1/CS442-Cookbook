from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView, status
from rest_framework.permissions import AllowAny

from apps.posts.models import Post
from apps.posts.serializers import PostSerializer
from apps.users.models import User


class UserPostsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id=None, username=None, format=None):
        if username:
            user = get_object_or_404(User, username=username)
        elif id:
            user = get_object_or_404(User, id=id)
        else:
            return Response(
                { 'error': 'Username or ID required' },
                status=status.HTTP_400_BAD_REQUEST
            )

        posts = user.posts.all()
        serializer = PostSerializer(posts, many=True)

        return Response({
            'username': user.username,
            'post_count': posts.count(),
            'posts': serializer.data
        })

    def post(self, request, format=None):
        """
        Create a post in the database
        """
        return Response('This is a Post post request')

class PostsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        """
        Get all posts from db
        """
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        """
        Create a post in the database
        """
        return Response('This is a Post post request')
