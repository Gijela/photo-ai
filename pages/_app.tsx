import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import PlausibleProvider from "next-plausible";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <PlausibleProvider domain="ai.devin.ren">
        <Component {...pageProps} />
      </PlausibleProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default MyApp;
