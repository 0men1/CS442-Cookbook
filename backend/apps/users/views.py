from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView 

class UserView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permissions_classes = [IsAuthenticated]

    def get(self, request, format=None):
        return Response("This is a GET request for a USER")

    def post(self, request, format=None):
        return Response("This is a POST request for a USER")

    def delete(self, request, format=None):
        return Response("This is a DELETE request for a USER")
