import { ValidationException } from "../exceptions/ValidationException";

function getErrorEl(): HTMLDivElement | null {
  return document.querySelector<HTMLDivElement>(".error_msg");
}
export function handleSearchError(error: unknown) {
  if (error instanceof ValidationException) {
    renderErrorMessage(error.message);
  } else {
    renderErrorMessage("Sorry, an unhandled error has occured");
  }
}

export function renderErrorMessage(message: string) {
  const errorEl = getErrorEl();
  if (!errorEl) return;

  errorEl.innerHTML = message;
}

export function clearErrorMessage() {
  const errorEl = getErrorEl();
  if (!errorEl) return;

  errorEl.innerHTML = "";
}
