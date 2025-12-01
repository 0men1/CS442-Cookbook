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
	created_at: string;
	updated_at: string;
}

export interface UserPostsResponse {
	username: string;
	post_count: number;
	posts: Post[];
}

export interface CreatePostPayload {
	user_id: number;
	post_type: string;
	title: string;
	body: string;
	ingredients?: string;
	instructions?: string;
	images?: { image_url: string; caption?: string }[];
}

export const API_URL = "http://127.0.0.1:8000"

export async function get_all_posts() {
	const response = await fetch(`${API_URL}/api/posts/`, {
		method: 'GET',
		credentials: "include",
	});
	return handleResponse<Post[]>(response);
}

export async function get_post_by_id(id: string) {
	const response = await fetch(`${API_URL}/api/posts/${id}/`, {
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
