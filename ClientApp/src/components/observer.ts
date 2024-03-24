import { searchPhotos } from "./search";

export function getAllPhotoEls(): NodeListOf<HTMLImageElement> | null {
  return document.querySelectorAll<HTMLImageElement>(".photo");
}

function getLastPhotoInEachCol(): HTMLImageElement[] {
  const firstColLastPhoto = document.querySelector(
    ".first_col img:last-child"
  ) as HTMLImageElement;
  const secondColLastPhoto = document.querySelector(
    ".second_col img:last-child"
  ) as HTMLImageElement;
  const thirdColLastPhoto = document.querySelector(
    ".third_col img:last-child"
  ) as HTMLImageElement;

  return [firstColLastPhoto, secondColLastPhoto, thirdColLastPhoto];
}

export async function setupObserver() {
  const observer = new IntersectionObserver(loadMoreHandler, {
    threshold: 1,
  });
  const photosEl = getAllPhotoEls();
  if (!photosEl) return;

  const lastThree: HTMLImageElement[] = getLastPhotoInEachCol();
  lastThree.forEach((x) => {
    observer.observe(x);
  });
}

async function loadMoreHandler(
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) {
  if (entries[0].isIntersecting) {
    observer.disconnect();
    await loadMorePhotos();
  }
}

async function loadMorePhotos() {
  await searchPhotos();
}
