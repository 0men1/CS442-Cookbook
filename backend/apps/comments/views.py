from rest_framework.response import Response
from rest_framework.views import APIView


class CommentsView(APIView):
    def get(self, request, format=None):
        return Response('This is a Comments get request')

    def post(self, request, format=None):
        return Response('This is a Comments post request')
