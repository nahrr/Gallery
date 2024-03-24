var p=Object.defineProperty;var y=(t,e,r)=>e in t?p(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var l=(t,e,r)=>(y(t,typeof e!="symbol"?e+"":e,r),r);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}})();class h extends Error{constructor(e){super(e),this.message=e??""}}const E="https://localhost:7019",c=class{constructor(e){this.requestService=e}async searchPhotos(e){this.validateInput(e);const r=this.getNextPageNumber(e),o=`${E}/Photos/Search?query=${e}&page=${r}`,n=await this.requestService.request(o,{method:"GET",mode:"cors"});if(n.ok){const{photos:s,page:a}=await n.json();return this.saveLatestQueryAndPage(e,a),s}else{const s=await n.json();return Promise.reject(new h(s.message))}}getNextPageNumber(e){const r=this.getLatestQuery(),o=this.getCurrentPageNumber();return e===r?o+1:1}getLatestQuery(){return sessionStorage.getItem(c.LATEST_QUERY_KEY)||""}getCurrentPageNumber(){const e=sessionStorage.getItem(c.CURRENT_PAGE_KEY);return e?parseInt(e,10):1}saveLatestQueryAndPage(e,r){sessionStorage.setItem(c.LATEST_QUERY_KEY,e),sessionStorage.setItem(c.CURRENT_PAGE_KEY,r.toString())}validateInput(e){if(!e)throw new Error("Invalid input: query is empty");return!0}};let i=c;l(i,"LATEST_QUERY_KEY","latestQuery"),l(i,"CURRENT_PAGE_KEY","currentPage");class v{async request(e,r){return await fetch(e,r)}}function m(){return document.querySelector(".error_msg")}function S(t){t instanceof h?d(t.message):d("Sorry, an unhandled error has occured")}function d(t){const e=m();e&&(e.innerHTML=t)}function _(){const t=m();t&&(t.innerHTML="")}function P(){return document.querySelector(".modal")}function L(){return document.querySelector(".modal_wrapper")}function w(){return document.querySelector(".modal-content")}function q(){return document.querySelector(".close")}function I(){const t=w();if(!t)return null;const e=t.querySelector("img");return e||null}function b(t){const e=P();if(!e)return;const r=q();if(!r)return;const o=I();if(!o)return;const n=L();n&&(e.style.display="block",o.src=t,r.addEventListener("click",function(){e.style.display="none"}),window.addEventListener("click",function(s){s.target===n&&(e.style.display="none")}))}function T(){return document.querySelectorAll(".photo")}function C(){const t=document.querySelector(".first_col img:last-child"),e=document.querySelector(".second_col img:last-child"),r=document.querySelector(".third_col img:last-child");return[t,e,r]}async function M(){const t=new IntersectionObserver(N,{threshold:1});if(!T())return;C().forEach(o=>{t.observe(o)})}async function N(t,e){t[0].isIntersecting&&(e.disconnect(),await A())}async function A(){await g()}async function R(t){if(!t)return;const e=t.map(o=>{const n=document.createElement("img");return n.src=o.largeSizeUrl,n.alt=o.title,n.classList.add("photo"),n}),r=document.querySelectorAll(".grid_col");for(let o=0;o<e.length;o++){const n=o%r.length;r[n].appendChild(e[o])}M()}function U(){const t=document.querySelector("#gallery");t&&t.addEventListener("click",function(e){const r=e.target.closest(".photo");r&&b(r.src)})}function Q(){const t=document.querySelectorAll(".grid_col");t&&t.forEach(e=>{e.innerHTML=""})}function Y(){return document.querySelector("#search_form")}function u(){return document.querySelector("#search_input")}function x(){return document.querySelector("#clear_input")}async function O(){Y().addEventListener("submit",async t=>{t.preventDefault(),Q(),await g()}),B()}async function g(){const t=new i(new v),e=u().value;try{_();const r=await t.searchPhotos(e);await R(r)}catch(r){S(r)}}function B(){const t=x();t.addEventListener("click",e=>{e.preventDefault(),f()}),t.addEventListener("touchstart",e=>{e.preventDefault(),f()})}function f(){u().value="",u().focus()}function K(){return`
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
  `}function G(){return`
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
  `}function H(){return`
    ${K()}
    ${G()}
  `}document.querySelector("#app").innerHTML=H();O();U();
