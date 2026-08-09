import { loginAction } from "../pages/login/loginAction";
import ProtectedRoute from "./ProtectedRoute";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Header from "../components/Header/Header";
import Spinner from "../components/Spinner/Spinner";

import { bookLoader } from "../pages/book-details/bookLoader";
import ErrorState from "../components/ErrorState/ErrorState";
import MyList from "../components/MyList/MyList";
const Home = lazy(() =>
  import("../pages/home/Home")
);

const BookDetails = lazy(() =>
  import("../pages/book-details/BookDetails")
);

const NotFound = lazy(() =>
  import("../pages/not-found/NotFound")
);
const Login = lazy(() =>
  import("../pages/login/Login")
);

function MainLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <MainLayout />,

    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/login",
        action: loginAction,
        element: (
          <Suspense fallback={<Spinner />}>
            <Login />
          </Suspense>
        ),
      },


      {
  path: "/library",
  element: (
    <ProtectedRoute>
        <MyList />  
    </ProtectedRoute>
  ),
},

      {
        path: "/book/:id",
        loader: bookLoader,
        element: (
          <Suspense fallback={<Spinner />}>
            <BookDetails />
          </Suspense>
        ),
        errorElement: <ErrorState />,
      },

      {
        path: "*",
        element: (
          <Suspense fallback={<Spinner />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;