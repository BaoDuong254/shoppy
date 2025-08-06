import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { useContext, lazy, Suspense } from "react";
import RegisterLayout from "@layouts/RegisterLayout";
import MainLayout from "@layouts/MainLayout";
import { AppContext } from "./contexts/app.context";
import path from "@constants/path";
import CartLayout from "@layouts/CartLayout";
import UserLayout from "@pages/User/layouts/UserLayout";
import Loading from "@components/Loading";

const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Cart = lazy(() => import("@pages/Cart"));
const ProductList = lazy(() => import("@pages/ProductList"));
const ProductDetail = lazy(() => import("@pages/ProductDetail"));
const Profile = lazy(() => import("@pages/User/pages/Profile"));
const ChangePassword = lazy(() => import("@pages/User/pages/ChangePassword"));
const HistoryPurchase = lazy(() => import("@pages/User/pages/HistoryPurchase"));
const NotFound = lazy(() => import("@pages/NotFound"));

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: "",
          element: <RegisterLayout />,
          children: [
            {
              path: path.login,
              element: (
                <Suspense fallback={<Loading />}>
                  <Login />
                </Suspense>
              ),
            },
            {
              path: path.register,
              element: (
                <Suspense fallback={<Loading />}>
                  <Register />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: <CartLayout />,
          children: [
            {
              path: "",
              element: (
                <Suspense fallback={<Loading />}>
                  <Cart />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: path.user,
          element: <MainLayout />,
          children: [
            {
              path: "",
              element: <UserLayout />,
              children: [
                {
                  path: path.profile,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <Profile />
                    </Suspense>
                  ),
                },
                {
                  path: path.changePassword,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <ChangePassword />
                    </Suspense>
                  ),
                },
                {
                  path: path.historyPurchase,
                  element: (
                    <Suspense fallback={<Loading />}>
                      <HistoryPurchase />
                    </Suspense>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: path.productDetail,
          element: (
            <Suspense fallback={<Loading />}>
              <ProductDetail />
            </Suspense>
          ),
        },
        {
          path: "",
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <ProductList />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: (
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return routeElements;
}
