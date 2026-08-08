import { useDispatch, useSelector } from "react-redux";
import {
  setSubject,
  setLanguage,
  setSort,
  resetFilters,
} from "../../redux/slices/filterSlice";

import "./Filters.css";

function Filters() {
  const dispatch = useDispatch();

  const { subject, language, sort } = useSelector(
    (state) => state.filter
  );
  const hasActiveFilters =
  subject !== "all" ||
  language !== "all" ||
  sort !== "relevance";

  return (
    <div className="filters">
      <select
        value={subject}
        onChange={(e) => dispatch(setSubject(e.target.value))}
      >
        <option value="all">All Subjects</option>
        <option value="fiction">Fiction</option>
        <option value="history">History</option>
        <option value="science">Science</option>
      </select>

      <select
        value={language}
        onChange={(e) => dispatch(setLanguage(e.target.value))}
      >
        <option value="all">All Languages</option>
        <option value="eng">English</option>
        <option value="hin">Hindi</option>
        <option value="fre">French</option>
      </select>

      <select
        value={sort}
        onChange={(e) => dispatch(setSort(e.target.value))}
      >
        <option value="relevance">Relevance</option>
        <option value="title">Title (A-Z)</option>
        <option value="rating">Rating</option>
      </select>

      <button
        type="button"
        onClick={() => dispatch(resetFilters())}
        disabled={!hasActiveFilters}
      >
        Reset Filters
      </button>
    </div>
  );
}

export default Filters;