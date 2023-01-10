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
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
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
    // async session({ session, token, user }) {
    //   session.accessToken = token.accessToken;
    //   return session;
    // },
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
  // secret: "sadasdasddasdsa",
});
