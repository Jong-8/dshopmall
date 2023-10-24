import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@components/Layout";
import { CookiesProvider } from "react-cookie";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
