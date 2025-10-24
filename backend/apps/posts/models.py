from django.db import models
from django.utils import timezone
from django.conf import settings


class Post(models.Model):
    POST_TYPE_THOUGHT = 'thought'
    POST_TYPE_RECIPE = 'recipe'
    POST_TYPE_IMAGE = 'image'

    POST_TYPE_CHOICES = [
        (POST_TYPE_RECIPE, 'Recipe'),
        (POST_TYPE_THOUGHT, 'Thought'),
        (POST_TYPE_IMAGE, 'Image')
    ]

    # Common fields
    id = models.UUIDField(primary_key=True)
    post_type = models.CharField(choices=POST_TYPE_CHOICES)
    body = models.TextField(max_length=500)

    # Can add images to any type of post (should it be an array instead?)
    filename = models.CharField()
    createdAt = models.DateTimeField(default=timezone.now)
    updatedAt = models.DateTimeField(default=timezone.now)
    userEmail = models.CharField(max_length=100, blank=True, null=True)
    userName = models.CharField(max_length=100, blank=True, null=True)
    # user = models.ForeignKey(settings.AUTH_USER_MODEL,
    #                          related_name='posts', on_delete=models.CASCADE)
    # having trouble figuring out how to get the user object from the request, so this wa
    image = models.ImageField(upload_to='apps/recipes/', blank=True, null=True)

    # Recipe fields

    ingredients = ""
    # we are storing all the steps as a JSON string
    steps = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"ID: {self.id}"
