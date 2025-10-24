import json
import uuid

from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.db import models

from apps.posts.models import Post


class Recipe(models.Model):
	title = models.CharField(max_length=255)
	description = models.TextField()
	steps = models.JSONField()
	image = models.ImageField(upload_to="apps/recipes/", null=True, blank=True)


class PostsView(APIView):
	def get(self, request, format=None):
		return Response('This is a Post get request')

	def post(self, request, format=None):
		print("=== Incoming Recipe ===")
		title = request.data.get("title")
		description = request.data.get("description")
		steps_list = request.data.get("steps")  # JSON string
		image = request.FILES.get("image")  # UploadedFile object
		email = request.data.get("email")
		user = request.data.get("user")
		print("Title:", title)
		print("Description:", description)
		print("Steps:", steps_list)
		print("Image:", image)
		print("======================")

		# Parse steps if needed


		# Create Post object
		post = Post(
			id=uuid.uuid4(),
			post_type=Post.POST_TYPE_RECIPE,
			body=description or "UNDESCRIBABLE FOOD OF MYTH FIT ONLY FOR GODS",
			filename=image,
			# need to test where this goes still
			image=image,
			userEmail= email,
			userName = user,
			# user=request.user,
			# ingredients=title if post_type==Post.POST_TYPE_RECIPE else "",
			steps=steps_list
		)


		post.save()

		return Response({"success": True, "post_id": str(post.id)}, status=status.HTTP_201_CREATED)