import {
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import ThemeContext from "./ThemeContext";
import { themeReducer } from "./reducers/themeReducer";


const initialTheme =
  localStorage.getItem("theme") || "light";

function ThemeProvider({ children }) {
  const [theme, dispatch] = useReducer(
    themeReducer,
    initialTheme
  );

 useEffect(() => {
  localStorage.setItem("theme", theme);

  document.documentElement.classList.remove(
    "light",
    "dark"
  );

  document.documentElement.classList.add(theme);
}, [theme]);

  const toggleTheme = useCallback(() => {
    dispatch({
      type: "TOGGLE_THEME",
    });
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;