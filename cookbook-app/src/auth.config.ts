import CredentialsProvider from "next-auth/providers/credentials";

const BACKEND_URL = process.env.NEXTAUTH_BACKEND_URL || "http://localhost:8000/api";

export default {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {

          const response = await fetch(`${BACKEND_URL}/users/login/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            return null;
          }

          const data = await response.json();

          return {
            id: data.user.id,
            name: data.user.username,
            email: data.user.email,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      }
    })
  ]
}
