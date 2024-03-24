function getModalEl(): HTMLDivElement | null {
  return document.querySelector<HTMLDivElement>(".modal");
}

function getModalWrapperEl(): HTMLDivElement | null {
  return document.querySelector<HTMLDivElement>(".modal_wrapper");
}

function getModalContentEl(): HTMLDivElement | null {
  return document.querySelector<HTMLDivElement>(".modal-content");
}

function getCloseBtnEl(): HTMLSpanElement | null {
  return document.querySelector<HTMLSpanElement>(".close");
}

function getModalImgEl(): HTMLImageElement | null {
  const modalContentEl = getModalContentEl();
  if (!modalContentEl) return null;
  const modalImgEl = modalContentEl.querySelector<HTMLImageElement>("img");
  if (!modalImgEl) return null;
  return modalImgEl;
}

export function modal(fullSizePhotoUrl: string) {
  const modalEl = getModalEl();
  if (!modalEl) return;
  const closeBtnEl = getCloseBtnEl();
  if (!closeBtnEl) return;

  const modalImgEl = getModalImgEl();
  if (!modalImgEl) return;

  const modalWrapperEl = getModalWrapperEl();
  if (!modalWrapperEl) return;

  modalEl.style.display = "block";
  modalImgEl.src = fullSizePhotoUrl;
  closeBtnEl.addEventListener("click", function () {
    modalEl.style.display = "none";
  });

  // When the user clicks anywhere outside the modal, hide the modal
  window.addEventListener("click", function (event) {
    if (event.target === modalWrapperEl) {
      modalEl.style.display = "none";
    }
  });
}
