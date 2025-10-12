from django.test import TestCase
from django.contrib.auth import get_user_model, authenticate
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .serializers import UserLoginSerializer, UserRegisterSerializer, UserSerializer

User = get_user_model()

class CustomUserManagerTests(TestCase):
    """Test the custom user manager"""

    def test_create_user(self):
        """Test creating a user with username and email"""
        user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'test@example.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertTrue(user.check_password('testpass123'))

    def test_create_user_missing_username(self):
        """Test creating user without username raises error"""
        with self.assertRaises(ValueError) as context:
            User.objects.create_user(
                username='',
                email='test@example.com',
                password='testpass123'
            )
        self.assertEqual(str(context.exception), "The username must be set")

    def test_create_superuser(self):
        """Test creating a superuser"""
        admin_user = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='adminpass123'
        )
        
        self.assertEqual(admin_user.username, 'admin')
        self.assertEqual(admin_user.email, 'admin@example.com')
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)

class UserAuthenticationTests(TestCase):
    """Test user authentication functionality"""

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )

    def test_authenticate_with_username(self):
        """Test authentication with username"""
        user = authenticate(username='testuser', password='testpass123')
        self.assertEqual(user, self.user)

    def test_authenticate_with_wrong_password(self):
        """Test authentication with wrong password"""
        user = authenticate(username='testuser', password='wrongpassword')
        self.assertIsNone(user)

class UserSerializerTests(TestCase):
    """Test user serializers"""

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123',
            first_name='Test',
            last_name='User',
            is_chef=True
        )

    def test_user_serializer(self):
        """Test UserSerializer serializes user data correctly"""
        serializer = UserSerializer(self.user)
        data = serializer.data
        
        self.assertEqual(data['username'], 'testuser')
        self.assertEqual(data['email'], 'test@example.com')
        self.assertEqual(data['first_name'], 'Test')
        self.assertEqual(data['last_name'], 'User')
        self.assertTrue(data['is_chef'])

    def test_login_serializer_valid_data(self):
        """Test UserLoginSerializer with valid credentials"""
        data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        serializer = UserLoginSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['user'], self.user)

    def test_login_serializer_invalid_password(self):
        """Test UserLoginSerializer with invalid password"""
        data = {
            'username': 'testuser',
            'password': 'wrongpassword'
        }
        serializer = UserLoginSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('Invalid credentials', str(serializer.errors))

    def test_register_serializer_valid_data(self):
        """Test UserRegisterSerializer with valid data"""
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'newpass123',
            'confirm_password': 'newpass123',
            'first_name': 'New',
            'last_name': 'User'
        }
        serializer = UserRegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        
        user = serializer.save()
        self.assertEqual(user.username, 'newuser')
        self.assertEqual(user.email, 'newuser@example.com')
        self.assertTrue(user.check_password('newpass123'))

class SimpleAPITests(APITestCase):
    """Basic API tests without URL reversing"""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )

    def test_login_success(self):
        """Test successful login"""
        data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        response = self.client.post('/api/users/login/', data, format='json')
        
        if response.status_code != 200:
            print(f"Login failed with status {response.status_code}: {response.data}")
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertIn('user', response.data)

    def test_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        data = {
            'username': 'testuser',
            'password': 'wrongpassword'
        }
        response = self.client.post('/api/users/login/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

