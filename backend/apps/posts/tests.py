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
            post_type=Post.POST_TYPE_THOUGHT,
            title="Test Thought Title",
            body="Test the thought body",
            user=self.user
        )

        self.assertEqual(post.title, "Test Thought Title")
        self.assertEqual(post.body, "Test the thought body")
        self.assertEqual(post.post_type, Post.POST_TYPE_THOUGHT)
        self.assertEqual(
            str(post), f"{Post.POST_TYPE_THOUGHT}: Test Thought Title by testuser")

        self.assertIsNone(post.ingredients)
        self.assertIsNone(post.instructions)

    def test_user_posting_recipe(self):
        post = Post.objects.create(
            post_type=Post.POST_TYPE_RECIPE,
            title="Test Recipe Title",
            body="Test the recipe body",
            ingredients="eggs, cheese",
            instructions="beat the eggs, pour the cheese",
            user=self.user
        )

        self.assertEqual(post.post_type, Post.POST_TYPE_RECIPE)
        self.assertEqual(post.title, "Test Recipe Title")
        self.assertEqual(post.body, "Test the recipe body")
        self.assertEqual(post.ingredients, "eggs, cheese")
        self.assertEqual(post.instructions, "beat the eggs, pour the cheese")
        self.assertEqual(
            str(post), f"{Post.POST_TYPE_RECIPE}: Test Recipe Title by testuser")


class ImageAndCommentsPostTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='test12345'
        )

        self.post = Post.objects.create(
            post_type=Post.POST_TYPE_THOUGHT,
            title="Test Thought Title",
            body="Test the thought body",
            user=self.user
        )

    def test_user_post_with_photo(self):
        postPhoto = PostImage.objects.create(
            post=self.post,
            image_url="/assets/some_image.jpg",
            caption="Caption Test"
        )

        self.assertEqual(postPhoto.image_url, "/assets/some_image.jpg")
        self.assertEqual(postPhoto.caption, "Caption Test")
        self.assertIn(str(self.post.id), str(postPhoto))

    def test_user_post_with_comment(self):
        secondUser = User.objects.create_user(
            username='commenteruser',
            email='commenteruser@random.com',
            password="commenter12345"
        )

        comment = PostComment.objects.create(
            post=self.post,
            user=secondUser,
            body="Nice Thought!"
        )

        self.assertEqual(comment.body, "Nice Thought!")
        self.assertEqual(comment.post, self.post)
        self.assertEqual(comment.user, secondUser)
        self.assertIn("commenteruser", str(comment))
        self.assertIn(str(self.post.id), str(comment))

    def test_user_can_like_post(self):
        likerOne = User.objects.create_user(
            username='likeruser',
            email='likeruser@example.com',
            password='like12345'
        )

        likerTwo = User.objects.create_user(
            username='likeruser2',
            email='likeruser2@example.com',
            password='like12345'
        )

        self.post.likes.add(likerOne)
        self.assertIn(likerOne, self.post.likes.all())
        self.assertEqual(self.post.likes.count(), 1)

        self.post.likes.remove(likerOne)
        self.assertEqual(self.post.likes.count(), 0)

        # ensuring users cant like a post twice
        self.post.likes.add(likerOne)
        self.post.likes.add(likerOne)
        self.assertIn(likerOne, self.post.likes.all())
        self.assertEqual(self.post.likes.count(), 1)

        self.post.likes.remove(likerOne)
        self.assertEqual(self.post.likes.count(), 0)

        # two users liking
        self.post.likes.add(likerOne)
        self.post.likes.add(likerTwo)
        self.assertIn(likerOne, self.post.likes.all())
        self.assertIn(likerTwo, self.post.likes.all())
        self.assertEqual(self.post.likes.count(), 2)
