


from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a user with a given username and pasword
        """
        if not email:
            return ValueError("The username must be set")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user


    def create_superuser(self, username, passwod, **extra_fields):
        return None
