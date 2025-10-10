from django.db import models
from django.utils import timezone
from django.conf import settings


class Comment(models.Model):
    id = models.UUIDField(primary_key=True)
    body = models.CharField()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='comments', on_delete=models.CASCADE)

    likes = models.IntegerField()
    dislikes = models.IntegerField()

    class Meta:
        None

    createdAt = models.DateTimeField(default=timezone.now)
    updatedAt = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"ID: {self.id} | By: {self.user.usename} | Body: {self.body[:50]}"
