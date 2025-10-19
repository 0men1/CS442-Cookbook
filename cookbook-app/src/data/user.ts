"use server"

const BACKEND_URL = process.env.NEXTAUTH_BACKEND_URL || "http://localhost:8000/api";

export async function get_all_users() {
	try {
		const response = await fetch(`${BACKEND_URL}/users/`, {
			credentials: "include",
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch users: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching users:", error);
		throw error;
	}
}

export async function get_user_by_id(id: string) {
	try {
		const response = await fetch(`${BACKEND_URL}/users/${id}/`, {
			credentials: "include",
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch user: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching user:", error);
		throw error;
	}
}

export async function get_user_by_username(username: string) {
	try {
		const response = await fetch(`${BACKEND_URL}/users/?username=${username}`, {
			credentials: "include",
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch user: ${response.status}`);
		}

		const users = await response.json();
		return users[0] || null;
	} catch (error) {
		console.error("Error fetching user:", error);
		throw error;
	}
}

export async function get_user_by_email(email: string) {
	try {
		const response = await fetch(`${BACKEND_URL}/users/?email=${email}`, {
			credentials: "include",
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch user: ${response.status}`);
		}

		const users = await response.json();
		return users[0] || null;
	} catch (error) {
		console.error("Error fetching user:", error);
		throw error;
	}
}
