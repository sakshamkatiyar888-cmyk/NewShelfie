import { redirect } from "react-router-dom";

import store from "../../redux/store";
import { login } from "../../redux/slices/authSlice";

export async function loginAction({ request }) {
  const formData = await request.formData();

  const username = formData.get("username");

  if (!username || !username.trim()) {
    return {
      error: "Username is required.",
    };
  }
  if (username.trim().length < 3) {
    return {
      error: "Username must be at least 3 characters long.",
    };
  }

  const fakeToken = `fake-token-${Date.now()}`;

  store.dispatch(login(fakeToken));

  return redirect("/library");
}