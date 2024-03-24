import "./style.css";
import { setupSearchBar } from "./components/search";
import { setupGalleryListner } from "./components/gallery";
function renderHeader() {
  return `
    <header class="main_header">
      <nav>
        <div class="search_bar_wrapper">
          <form id="search_form">
            <button>
              <svg width="32" height="32" class="DFW_E nT46U VETef" viewBox="0 0 24 24">
                <path d="M16.5 15c.9-1.2 1.5-2.8 1.5-4.5C18 6.4 14.6 3 10.5 3S3 6.4 3 10.5 6.4 18 10.5 18c1.7 0 3.2-.5 4.5-1.5l4.6 4.5 1.4-1.5-4.5-4.5zm-6 1c-3 0-5.5-2.5-5.5-5.5S7.5 5 10.5 5 16 7.5 16 10.5 13.5 16 10.5 16z"></path>
              </svg>
            </button>
            <input type="text" id="search_input" placeholder="Search photos" autocomplete="off" required />
            <button type="button" id="clear_input">
              <svg width="32" height="32" class="Xarwh VdNCI nT46U" viewBox="0 0 24 24">
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"></path>
              </svg>
            </button>
          </form>
        </div>
      </nav>
    </header>
  `;
}

function renderMainContent() {
  return `
    <main class="main_content">
      <div class="error_msg"></div>
      <div id="gallery">
        <div class="grid_col first_col"></div>
        <div class="grid_col second_col"></div>
        <div class="grid_col third_col"></div>
      </div>
      <div class="modal">
        <div class="modal_wrapper">
          <div class="modal-content">
            <span class="close">&times;</span>
            <img src="" alt="Photo" class="modal_photo">
          </div>
        </div>
      </div>
    </main>
  `;
}

function renderPage() {
  return `
    ${renderHeader()}
    ${renderMainContent()}
  `;
}

// Set the HTML of the app element to the rendered page
document.querySelector<HTMLDivElement>("#app")!.innerHTML = renderPage();

setupSearchBar();

setupGalleryListner();
