from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from .managers import CustomUserManager
import uuid


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4(), editable=False)
    first_name = models.CharField(blank=True)
    last_name = models.CharField(blank=True)
    username = models.CharField(unique=True)
    email = models.EmailField(unique=True)

    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_chef = models.BooleanField(default=False)

    date_joined = models.DateTimeField(timezone.now())

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.last_name} | {self.username} | {self.email}"
