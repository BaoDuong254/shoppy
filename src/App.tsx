import { ToastContainer } from "react-toastify";
import useRouteElements from "./useRouteElements";

export default function App() {
  const routeElements = useRouteElements();
  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  );
}
