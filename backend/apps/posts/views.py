import uuid

from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView, status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated

from apps.posts.models import *
from apps.posts.serializers import PostSerializer
from apps.users.models import User
from django.utils import timezone
from django.db import models


class UserPostsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id=None, username=None, format=None):
        if username:
            user = get_object_or_404(User, username=username)
        elif id:
            user = get_object_or_404(User, id=id)
        else:
            return Response(
                {'error': 'Username or ID required'},
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

    def get(self, request, id=None, format=None):
        """
        Get all posts from db
        """
        if id:
            post = get_object_or_404(Post, id=id)
            serializer = PostSerializer(post)
            return Response(serializer.data)
        else:
            posts = Post.objects.all()
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data)

    def delete(self, request, id=None, format=None):
        post = get_object_or_404(Post, id=id)
        post.delete();
        return Response(status=status.HTTP_204_NO_CONTENT)

    """
    Create a post in the database
    """

    def post(self, request, format=None):
        user_id = request.data.get('user_id')

        if not user_id:
            return Response({'error': 'Unknown Author'}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(User, id=user_id)
        serializer = PostSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            post = serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
