import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Header from "../components/Header/Header";
import Spinner from "../components/Spinner/Spinner";

const Home = lazy(() =>
  import("../pages/home/Home")
);

const BookDetails = lazy(() =>
  import("../pages/book-details/BookDetails")
);

const NotFound = lazy(() =>
  import("../pages/not-found/NotFound")
);

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />

      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/book/:id"
            element={<BookDetails />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;