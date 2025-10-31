from django.db import models
from django.conf import settings
import uuid


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
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    post_type = models.CharField(choices=POST_TYPE_CHOICES, max_length=10)
    title = models.CharField(max_length=200)
    body = models.TextField(max_length=500)

    #Authro
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='posts', 
        on_delete=models.CASCADE
    )

    # Likes
    # Many to Many Doc cause i need it lol: https://docs.djangoproject.com/en/5.2/topics/db/examples/many_to_many/
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='liked_posts', 
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    # Recipe fields
    ingredients = models.TextField(blank=True, null=True)
    instructions = models.TextField(blank=True, null=True)



    def __str__(self):
        return f"{self.post_type}: {self.title} by {self.user.username}"


class PostImage (models.Model):
    """
    Separate model for images on a post
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post = models.ForeignKey(Post, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='post_images/')
    caption = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.post.id}"

class PostComment(models.Model):
    """
    Comments for any post type
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='comments',
        on_delete=models.CASCADE
    )
    body = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.post.id}"

