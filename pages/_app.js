import BaseLayout from "../component/layout/baseLayout";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  );
}

export default MyApp;
