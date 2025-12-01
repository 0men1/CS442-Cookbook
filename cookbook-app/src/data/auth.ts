import { API_URL } from "./post";
import { handleResponse } from "./utils";


export interface UserAuth {
	user: {
		id: number,
		username: string,
		email: string
	}
}

export interface RegisterUserPayload {
	username: string,
	email: string,
	password: string,
	confirm_password: string,
}


export async function user_login(username: string, password: string) {
	const response = await fetch(`${API_URL}/api/users/login/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({
			username: username,
			password: password,
		}),
	});
	return handleResponse<UserAuth>(response);
}

export async function user_register(data: RegisterUserPayload) {
	const response = await fetch(`${API_URL}/api/users/register/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			data
		}),
	});
	return handleResponse<UserAuth>(response);
}

