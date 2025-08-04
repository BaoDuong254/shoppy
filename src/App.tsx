import { ToastContainer } from "react-toastify";
import useRouteElements from "./useRouteElements";
import { useContext, useEffect } from "react";
import { LocalStorageEventTarget } from "@utils/auth";
import { AppContext } from "@contexts/app.context";

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
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  );
}
