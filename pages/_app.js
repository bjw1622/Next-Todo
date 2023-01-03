import BaseLayout from "../component/layout/baseLayout";
import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} basePath="/api/auth">
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </SessionProvider>
  );
}

export default MyApp;
