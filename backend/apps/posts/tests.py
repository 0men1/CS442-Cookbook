from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.posts.models import Post, PostImage, PostComment

User = get_user_model()

class CommonFieldsPostTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='test12345'
        )
    
    def test_user_posting_thought(self):
        post = Post.objects.create(
            post_type = Post.POST_TYPE_THOUGHT,
            title = "Test Thought Title",
            body = "Test the thought body",
            user = self.user
        )

        self.assertEqual(post.title, "Test Thought Title")
        self.assertEqual(post.body, "Test the thought body")
        self.assertEqual(post.post_type, Post.POST_TYPE_THOUGHT)
        self.assertEqual(str(post), f"{Post.POST_TYPE_THOUGHT}: Test Thought Title by testuser")

        self.assertIsNone(post.ingredients)
        self.assertIsNone(post.instructions)

    
    def test_user_posting_recipe(self):
        post = Post.objects.create(
            post_type = Post.POST_TYPE_RECIPE,
            title = "Test Recipe Title",
            body = "Test the recipe body",
            ingredients = "eggs, cheese",
            instructions = "beat the eggs, pour the cheese",
            user = self.user
        )

        self.assertEqual(post.post_type, Post.POST_TYPE_RECIPE)
        self.assertEqual(post.title, "Test Recipe Title")
        self.assertEqual(post.body, "Test the recipe body")
        self.assertEqual(post.ingredients, "eggs, cheese")
        self.assertEqual(post.instructions, "beat the eggs, pour the cheese")
        self.assertEqual(str(post), f"{Post.POST_TYPE_RECIPE}: Test Recipe Title by testuser")




class ImageAndCommentsPostTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='test12345'
        )

        post = Post.objects.create(
            post_type = Post.POST_TYPE_THOUGHT,
            title = "Test Thought Title",
            body = "Test the thought body",
            user = self.user
        )



