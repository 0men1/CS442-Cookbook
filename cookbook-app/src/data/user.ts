import { API_URL } from "./post";
import { handleResponse } from "./utils";

export interface User {
	id: number,
	first_name: string
	last_name: string,
	username: string,
	email: string,
	is_chef: boolean,
	created_at: Date,
	updated_at: Date
}



export async function get_all_users() {
	const response = await fetch(`${API_URL}/api/users/`, {
		method: 'GET',
		credentials: "include",
	});
	return handleResponse<User[]>(response);
}

export async function get_user_by_id(id: number) {
	const response = await fetch(`${API_URL}/api/users/${id}/`, {
		method: 'GET',
		credentials: "include",
	});
	return handleResponse<User>(response);
}

export async function get_user_by_username(username: string) {
	const response = await fetch(`${API_URL}/api/users/?username=${username}`, {
		method: 'GET',
		credentials: "include",
		cache: "no-store",
	});
	return handleResponse<User>(response);
}

export async function get_user_by_email(email: string) {
	const response = await fetch(`${API_URL}/api/users/?email=${email}`, {
		method: 'GET',
		credentials: "include",
		cache: "no-store",
	});

	return handleResponse<User>(response);
}
