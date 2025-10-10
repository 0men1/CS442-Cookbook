from rest_framework.response import Response
from rest_framework.views import APIView


class PostsView(APIView):
    def get(self, request, format=None):
        return Response('This is a Post get request')

    def post(self, request, format=None):
        return Response('This is a Post post request')
