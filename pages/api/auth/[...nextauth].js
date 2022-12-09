import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import { fbAuth } from "../../../javascripts/firebaseConfig";

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
    async signIn({ user, account, profile, email, credentials }) {
      try {
        //account 변수에서 id_token을 가지고 google auth credential 생성
        const googleCredential = GoogleAuthProvider.credential(
          account?.id_token
        );
        //생성된 credential로 signInWithCredential 실행
        const userCredential = await signInWithCredential(
          fbAuth,
          googleCredential
        ).catch((e) => {
          console.log(e);
          return false; // 로그인 중 에러 발생 -> false 반환
        });
        return userCredential ? true : false; //로그인 성공여부 반환
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
export default NextAuth(authOptions);
