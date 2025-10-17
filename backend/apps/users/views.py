from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView, status

from django.shortcuts import get_object_or_404
from django.contrib.auth import login
from django.db import IntegrityError

from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer

from .models import User


class UserView(APIView):
    def get(self, request, id=None, username=None, email=None, format=None):
        """
        Fetch a user from the database based off of a single parameter
        """
        if id:
            user=get_object_or_404(User, id=id)
        elif email:
            user=get_object_or_404(User, email=email)
        elif username:
            user=get_object_or_404(User, username=username)
        else:
            return Response(
                {'error': 'No valid lookup parameter provided'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer=UserSerializer(user, many=False)
        return Response(serializer.data)

    def update(self, request, format=None):
        """
        Update a user's information
        """
        return Response("This is a POST request for a USER")

    def delete(self, request, format=None):
        """
        Delete a user
        """
        return Response("This is a DELETE request for a USER")


class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)

            user_serializer = UserSerializer(user)
            response_data = user_serializer.data
            response_data.pop('password', None)

            return Response({
                'message': 'Login successful',
                'user': response_data
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserRegisterView(APIView):
    authentication_classes=[SessionAuthentication, BasicAuthentication]
    permissions_classes=[AllowAny]


    def post(self, request, format=None):
        """
        Create a user
        """
        serializer=UserRegisterSerializer(data=request.data)

        if serializer.is_valid():
            try:
                user=serializer.save()

                response_serializer=UserRegisterSerializer(user)
                response_data=response_serializer.data

                return Response(response_data, status=status.HTTP_200_OK)

            except IntegrityError as e:
                return Response(
                    {'error': 'User with this email or username already exists'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            except Exception as e:
                return Response(
                    {'error': 'Failed to create user'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

