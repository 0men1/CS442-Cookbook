import NextAuth from "next-auth"
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("Token: ", token)
        console.log("User: ", user)
        token.user = {
          id: user.id,
          username: user.name,
          email: user.email,
        };
      }
      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    }
  },

  session: { strategy: "jwt" },
  pages: {
    signIn: '/login',
  },
});

