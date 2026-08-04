import { API } from "../utils/constants.js";
const BASE_URL = API.BASE_URL;

export async function openLibrarySearch(query) {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch books.");
    }

    const data = await response.json();

    return data.docs;
  } catch (error) {
    console.error("OpenLibrary API Error:", error);
    throw error;
  }
}