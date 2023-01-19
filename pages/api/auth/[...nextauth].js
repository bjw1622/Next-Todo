import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "257ac962cea6392c09df",
      clientSecret: "ab8b1a5ed78eaac8aa188deffd3d70c40c11298f",
    }),
    GoogleProvider({
      clientId:
        "413999012118-t9ln1oq4rprvgglctre1unks9j285k3u.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
