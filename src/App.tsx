import { ToastContainer } from "react-toastify";
import useRouteElements from "./useRouteElements";
import { useContext, useEffect } from "react";
import { LocalStorageEventTarget } from "@utils/auth";
import { AppContext } from "@contexts/app.context";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "@components/ErrorBoundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App() {
  const routeElements = useRouteElements();
  const { reset } = useContext(AppContext);

  useEffect(() => {
    LocalStorageEventTarget.addEventListener("clearLS", reset);
    return () => {
      LocalStorageEventTarget.removeEventListener("clearLS", reset);
    };
  }, [reset]);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        {routeElements}
        <ToastContainer />
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </HelmetProvider>
  );
}
