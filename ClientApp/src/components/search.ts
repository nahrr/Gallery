import { ApiService } from "../services/ApiService";
import { RequestService } from "../services/RequestService";
import { clearErrorMessage, handleSearchError } from "./error";
import { clearGallery, renderPhotos } from "./gallery";

export function getSearchForm(): HTMLFormElement {
  return document.querySelector<HTMLFormElement>("#search_form")!;
}

export function getSearchInput(): HTMLInputElement {
  return document.querySelector<HTMLInputElement>("#search_input")!;
}

export function getClearBtn(): HTMLButtonElement {
  return document.querySelector<HTMLButtonElement>("#clear_input")!;
}

export async function setupSearchBar() {
  getSearchForm().addEventListener("submit", async (event: SubmitEvent) => {
    event.preventDefault();
    clearGallery();
    await searchPhotos();
  });
  setupUpClearSearch();
}

export async function searchPhotos() {
  const apiService = new ApiService(new RequestService());
  const query = getSearchInput().value;
  try {
    clearErrorMessage();
    const photos = await apiService.searchPhotos(query);
    await renderPhotos(photos);
  } catch (error: unknown) {
    handleSearchError(error);
  }
}

function setupUpClearSearch() {
  const clearBtn = getClearBtn();
  clearBtn.addEventListener("click", (event: MouseEvent) => {
    event.preventDefault();
    clearSeachInput();
  });
  clearBtn.addEventListener("touchstart", (event: TouchEvent) => {
    event.preventDefault();
    clearSeachInput();
  });
}

function clearSeachInput() {
  getSearchInput().value = "";
  getSearchInput().focus();
}
