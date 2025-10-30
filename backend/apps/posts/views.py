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

    def get(self, request, format=None):
        """
        Get all posts from db
        """
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


    """
    Create a post in the database
    """
    def post(self, request, format=None):
        print("===========REQUEST START=============")
        print(request.data)
        print("===========REQUEST = END=============")

        # Find user
        if request.data.get('username'):
            user = get_object_or_404(User, username=request.data.get('username'))
        elif request.data.get('id'):
            user = get_object_or_404(User, id=request.data.get('id'))
        else:
            return Response({'error': 'Username required'}, status=status.HTTP_400_BAD_REQUEST)


        # Create dummy post data (do NOT include read-only fields)

        # dummy post, i intend to try and make test cases out of this maybe
        # dummyPost = {
        #     'post_type': Post.POST_TYPE_RECIPE,
        #     'title': "CHICKENIZATION FOODS",
        #     'body': "THE FOOD TURNS U INTO A FLIGHTLESS BIRD TAINTED WIT FEATHERS",
        #     'instructions': "{1: CHIGGEN, 2:NUGGET}",
        #     'ingredients': " CHIGGEN, NOOGET"
        # }

        # Pass request in context so serializer.create() can access request.user
        serializer = PostSerializer(data=request, context={'request': request})
        if serializer.is_valid():
            post = serializer.save(user=user)  # user is automatically set in create()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

