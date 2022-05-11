import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import ErrorBoundary from "@/components/ErrorBoundary";
import DefaultLayout from "@/layouts/DefaultLayout";
import "../styles/globals.css";
import { setOffline, setOnline } from "@/redux/networkSlice";

/**
 * MyApp: The Component App of the web app
 * @return {JSX.Element} The TSX Code for the App
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.addEventListener("offline", (event) => {
      store.dispatch(setOffline());
    });

    window.addEventListener("online", (event) => {
      store.dispatch(setOnline());
    });
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </Provider>
    </ErrorBoundary>
  );
}
