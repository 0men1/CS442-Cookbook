from rest_framework import serializers
from apps.posts.models import  Post, PostComment, PostImage
from apps.users.serializers import UserSerializer


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'image', 'caption', 'created_at']
        read_only_fields = ['id', 'created_at']


class PostCommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = PostComment
        fields = ['id', 'post', 'user', 'body', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class PostDetailSerializer(serializers.ModelSerializer):
    """
    get the details of a post (nested relationships)
    """
    user = UserSerializer(read_only=True)
    images = PostImageSerializer(many=True, read_only=True)
    comments = PostCommentSerializer(many=True, read_only=True)
    like_count = serializers.IntegerField(read_only=True, source='likes.count')
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id', 'post_type', 'title', 'body', 
            'user', 'images', 'comments', 'is_liked',
            'like_count', 'ingredients', 'instructions',
            'created_at', 'updated_at'
        ]
        read_only_fields=['id', 'created_at', 'updated_at']


    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False



class PostSerializer(serializers.ModelSerializer):
    """
    Basic post serial
    """
    user = UserSerializer(read_only=True)
    like_count = serializers.IntegerField(read_only=True, source='likes.count')
    image_count = serializers.IntegerField(read_only=True, source='images.count')
    comment_count = serializers.IntegerField(read_only=True, source='comments.count')

    class Meta:
        model = Post
        fields = [
            'id', 'post_type', 'title', 'body', 
            'user', 'like_count', 
            'image_count', 'comment_count',
            'ingredients', 'instructions',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    
    def validate(self, attrs):
        if attrs.get('post_type') == Post.POST_TYPE_RECIPE:
            if not attrs.get('ingredients') or not attrs.get('instructions'):
                raise serializers.ValidationError(
                    "Recipe posts require ingredients and instructions."
                )

        return attrs


    def create(self, validated_data):
        images_data = validated_data.pop('images', [])

        post = super().create(validated_data)
        for image_data in images_data:
            PostImage.objects.create(post=post, **image_data)

        return post

