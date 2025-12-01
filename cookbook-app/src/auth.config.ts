import CredentialsProvider from "next-auth/providers/credentials";
import { user_login } from "./data/auth";

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
          const response = await user_login(credentials.username as string, credentials.password as string)
          if (!response) { return null; }
          return {
            id: response.user.id,
            name: response.user.username,
            email: response.user.email,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      }
    })
  ]
}
