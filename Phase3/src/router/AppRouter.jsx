import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Spinner from "../components/Spinner/Spinner";
import ErrorState from "../components/ErrorState/ErrorState";
import MyList from "../components/MyList/MyList";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import { bookLoader } from "../pages/book-details/bookLoader";


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