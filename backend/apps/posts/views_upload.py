from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
import uuid

class ImageUploadView(APIView):
    def post(self, request):
        file = request.FILES.get("file")

        if not file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

        filename = f"{uuid.uuid4()}-{file.name}"

        saved_path = default_storage.save(filename, ContentFile(file.read()))

        file_url = request.build_absolute_uri(settings.MEDIA_URL + saved_path)

        return Response({"url": file_url}, status=status.HTTP_201_CREATED)
