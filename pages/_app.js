import BaseLayout from "../component/layout/baseLayout";
import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import Router from "next/router";
import Loading from "../component/common/Loading";
import { useEffect, useState } from "react";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
  }, []);

  return (
    <SessionProvider session={session} basePath="/api/auth">
      <BaseLayout>
        {loading ? <Loading></Loading> : <Component {...pageProps} />}
      </BaseLayout>
    </SessionProvider>
  );
};
export default MyApp;
