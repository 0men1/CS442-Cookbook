import { User } from "./user";
import { handleResponse } from "./utils";

export interface PostImage {
	id: string;
	image_url: string;
	caption: string;
	created_at: string;
}

export interface Post {
	id: string;
	post_type: string;
	title: string;
	body: string;
	user: User;
	images: PostImage[];
	ingredients?: string;
	instructions?: string;
	comments: PostComment[]
	is_liked?: boolean,
	like_count?: number,
	created_at: string;
	updated_at: string;
}

export interface UserPostsResponse {
	username: string;
	post_count: number;
	posts: Post[];
}

export interface CreatePostPayload {
	user_id: string;
	post_type: string;
	title: string;
	body: string;
	ingredients?: string;
	instructions?: string;
	images?: { image_url: string; caption?: string }[];
}

export const API_URL = "http://127.0.0.1:8000"

export interface PostComment {
	id: string;
	post: string;
	user: User;
	body: string;
	created_at: string;
	updated_at: string;
}

export interface CreateCommentPayload {
	body: string;
	user_id: string;
}

export interface LikeResponse {
	is_liked: boolean;
	like_count: number;
}

export async function like_post(postId: string, userId: string) {
	const response = await fetch(`${API_URL}/api/posts/${postId}/like/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ user_id: userId }),
		credentials: "include",
	});
	return handleResponse<LikeResponse>(response);
}

export async function create_comment(postId: string, data: CreateCommentPayload) {
	const response = await fetch(`${API_URL}/api/posts/${postId}/comment/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
		credentials: "include",
	});
	return handleResponse<PostComment>(response);
}

export async function get_comments(postId: string) {
	const response = await fetch(`${API_URL}/api/posts/${postId}/comment/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return handleResponse<PostComment[]>(response);
}

export async function get_all_posts() {
	const response = await fetch(`${API_URL}/api/posts/`, {
		method: 'GET',
		credentials: "include",
	});
	return handleResponse<Post[]>(response);
}

export async function get_post_by_id(id: string, user_id: string) {
	const response = await fetch(`${API_URL}/api/posts/${id}/?user_id=${user_id}`, {
		method: 'GET',
		credentials: "include",
	});
	return handleResponse<Post>(response);
}

export async function create_post(data: CreatePostPayload) {
	const response = await fetch(`${API_URL}/api/posts/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
		credentials: "include",
	});
	return handleResponse<Post>(response);
}

export async function delete_post(id: number) {
	const response = await fetch(`${API_URL}/api/posts/${id}/`, {
		method: "DELETE",
		credentials: "include",
	});
	return handleResponse<void>(response);
}

export async function get_posts_by_username(username: string) {
	const response = await fetch(`${API_URL}/api/posts/user/${username}/`, {
		method: 'GET',
		credentials: "include",
		cache: "no-store",
	});
	return handleResponse<UserPostsResponse>(response);
}

export async function get_posts_by_user_id(id: string) {
	const response = await fetch(`${API_URL}/api/posts/user/${id}/`, {
		method: 'GET',
		credentials: "include",
		cache: "no-store",
	});
	return handleResponse<UserPostsResponse>(response);
}
