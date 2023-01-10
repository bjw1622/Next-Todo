import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import { fbAuth } from "../../../javascripts/firebaseConfig";

export default NextAuth({
  providers: [
    // GithubProvider({
    //   clientId: "257ac962cea6392c09df",
    //   clientSecret: "ab8b1a5ed78eaac8aa188deffd3d70c40c11298f",
    // }),
    GoogleProvider({
      clientId:
        "413999012118-t9ln1oq4rprvgglctre1unks9j285k3u.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    // KakaoProvider({
    //   clientId: "1166cc6dd524d73516b8eb8671f1bcb0",
    //   clientSecret: "5acgT51YvTUGi2x9DxyCzAvQyusZPa4o",
    // }),
  ],
  callbacks: {
    // async jwt({ token, account }) {
    //   if (account) {
    //     token.accessToken = account.access_token;
    //   }
    //   return token;
    // },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const googleCredential = GoogleAuthProvider.credential(
          account?.id_token
        );
        const userCredential = await signInWithCredential(
          fbAuth,
          googleCredential
        ).catch((e) => {
          console.log(e);
          return false;
        });
        return userCredential ? true : false;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
  secret: "lwkxur4xV7PI5wBi3mVWf9plP7WzyBd/MrEw5ZkDbaQ",
});
