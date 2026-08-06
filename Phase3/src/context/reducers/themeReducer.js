import { THEME_ACTIONS } from "./themeActions";

export function themeReducer(state, action) {
  switch (action.type) {
    case THEME_ACTIONS.TOGGLE_THEME:
      return state === "light" ? "dark" : "light";

    default:
      return state;
  }
}