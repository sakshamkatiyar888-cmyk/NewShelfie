import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Home.css";

import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/SearchBar";
import BookList from "../../components/BookList/BookList";
import MyList from "../../components/MyList/MyList";

import Spinner from "../../components/Spinner/Spinner";
import ErrorState from "../../components/ErrorState/ErrorState";
import EmptyState from "../../components/EmptyState/EmptyState";

import useDebounce from "../../hooks/useDebounce";

import { clearSearch } from "../../redux/slices/searchSlice";
import { fetchBooks } from "../../redux/actions/searchActions";

function Home() {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const books = useSelector(
    (state) => state.search.books
  );

  const loading = useSelector(
    (state) => state.search.loading
  );

  const error = useSelector(
    (state) => state.search.error
  );

const debouncedQuery = useDebounce(query, 500);

const handleSearch = useCallback((value) => {
  setQuery(value);
}, []);

useEffect(() => {
  if (!debouncedQuery.trim()) {
    dispatch(clearSearch());
    return;
  }

  const promise = dispatch(fetchBooks(debouncedQuery));

  return () => {
    promise.abort();
  };
}, [debouncedQuery, dispatch]);

  return (
    <>
      <Hero />

      <SearchBar onSearch={handleSearch} />

      {debouncedQuery && !loading && !error && (
        <div className="results-info">
          📚 Found <strong>{books.length}</strong>{" "}
          {books.length === 1 ? "Book" : "Books"}
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : error ? (
        <ErrorState message={error} />
      ) : books.length === 0 && debouncedQuery ? (
        <EmptyState />
      ) : (
        <BookList books={books} />
      )}

      <MyList />
    </>
  );
}

export default Home;