import * as z from "zod"


export const SignInSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must have than 8 characters'),
});


export const RegisterSchema = z.object({
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
