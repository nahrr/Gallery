import Photo from "../contracts/Photo";
import { modal } from "./modal";
import { setupObserver } from "./observer";

export async function renderPhotos(photos: Photo[]) {
  if (!photos) return;
  const photoElements: HTMLImageElement[] = photos.map((photo) => {
    const img = document.createElement("img");
    img.src = photo.largeSizeUrl;
    img.alt = photo.title;
    img.classList.add("photo");
    return img;
  });

  const columns = document.querySelectorAll<HTMLDivElement>(".grid_col");

  for (let i = 0; i < photoElements.length; i++) {
    const columnIndex = i % columns.length;
    columns[columnIndex].appendChild(photoElements[i]);
  }

  setupObserver();
}

export function setupGalleryListner() {
  const gallery = document.querySelector<HTMLDivElement>("#gallery");
  if (!gallery) return;
  gallery.addEventListener("click", function (event) {
    const photo = (event.target as HTMLImageElement).closest(
      ".photo"
    ) as HTMLImageElement;
    if (photo) {
      modal(photo.src);
    }
  });
}

export function clearGallery() {
  const columns = document.querySelectorAll<HTMLDivElement>(".grid_col");
  if (!columns) return;
  columns.forEach((el) => {
    el.innerHTML = "";
  });
}
