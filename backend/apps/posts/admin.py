from django.contrib import admin
from .models import Post, PostImage, PostComment


class PostImageInline(admin.TabularInline):
    model = PostImage
    extra = 1
    # use image_url if you switched to URL field
    fields = ['image_url', 'caption']


class PostCommentInline(admin.TabularInline):
    model = PostComment
    extra = 1
    fields = ['user', 'body']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'post_type', 'user', 'created_at']
    search_fields = ['title', 'body', 'user__username']
    inlines = [PostImageInline, PostCommentInline]
