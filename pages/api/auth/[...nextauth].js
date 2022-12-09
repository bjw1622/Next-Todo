import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: "257ac962cea6392c09df",
      clientSecret: "e241144a24da889b814339a1b5ece180cb376481",
    }),
    GoogleProvider({
      clientId:
        "413999012118-t9ln1oq4rprvgglctre1unks9j285k3u.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    KakaoProvider({
      clientId: "1166cc6dd524d73516b8eb8671f1bcb0",
      clientSecret: "5acgT51YvTUGi2x9DxyCzAvQyusZPa4o",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
export default NextAuth(authOptions);
