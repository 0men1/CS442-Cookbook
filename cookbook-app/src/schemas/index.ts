import * as z from "zod"


export const UserLoginSchema = z.object({
	username: z
		.string()
		.min(1, "Username is required")
		.max(50),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must have than 8 characters'),
});


export const UserRegisterSchema = z.object({
	username: z
		.string()
		.min(1, "Username is required")
		.max(50),
	email: z
		.string()
		.min(1, "Email is required")
		.max(50)
		.email("Invalid email"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must be at-least 8 character"),
	confirm_password: z
		.string()
		.min(1, "Confirm password is required")
})
