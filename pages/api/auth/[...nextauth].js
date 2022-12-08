import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: "257ac962cea6392c09df",
      clientSecret: "e241144a24da889b814339a1b5ece180cb376481",
    }),
    GoogleProvider({
      clientId:
        "888369941086-n5s6eglktd94incsk8g5ikjjeuo85hnv.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
  // ...add more providers here
};
export default NextAuth(authOptions);
