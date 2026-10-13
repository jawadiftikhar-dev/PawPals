(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`/PawPals/`,t=new Map;function n(e,n){t.set(e,n)}function r(t){return t.startsWith(e)?(`/`+t.slice(9)).replace(/\/$/,``)||`/`:t}function i(t){let n=e.replace(/\/$/,``);return t===`/`?n+`/`:n+t}function a(e){let t=i(e);t!==window.location.pathname&&(window.history.pushState({},``,t),o())}function o(){let e=document.querySelector(`#app`);if(!e)return;let n=r(window.location.pathname),i=t.get(n)??t.get(`*`);e.innerHTML=i?i():`<h1>Page not found</h1>`,s(n),document.title=c(n)}function s(e){document.querySelectorAll(`[data-link]`).forEach(t=>{r(new URL(t.href).pathname)===e?t.setAttribute(`aria-current`,`page`):t.removeAttribute(`aria-current`)})}function c(e){return{"/":`PawPals Pet Clinic`,"/services":`Services — PawPals`,"/appointment":`Book an Appointment — PawPals`}[e]??`Page not found — PawPals`}function l(){document.addEventListener(`click`,e=>{let t=e.target.closest(`a[data-link]`);if(!t||e.metaKey||e.ctrlKey||e.shiftKey||e.button!==0)return;e.preventDefault();let n=new URL(t.href).pathname;a(r(n))})}function u(){l(),window.addEventListener(`popstate`,o),o()}function d(){return`
    <section class="hero">
      <div class="hero-text">
        <h1>Care for every paw 🐾</h1>
        <p>Your neighbourhood pet clinic — book appointments anytime, even offline.</p>
        <a href="/appointment" class="btn-primary" data-link>Book an appointment</a>
      </div>
      <img
        class="hero-image"
        src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800"
        alt="A happy dog and cat sitting together"
        loading="lazy"
      />
    </section>
  `}function f(){return`
    <section class="page">
      <h1>Our Services</h1>
      <p>From routine check-ups to emergency care, we look after every kind of pet.</p>
      <ul class="service-list">
        <li>
          <h2>Wellness Exams</h2>
          <p>Annual health checks, vaccinations, and preventative care.</p>
        </li>
        <li>
          <h2>Dental Care</h2>
          <p>Cleaning, polishing, and treatment for dental disease.</p>
        </li>
        <li>
          <h2>Grooming</h2>
          <p>Bathing, clipping, and coat care for dogs and cats.</p>
        </li>
        <li>
          <h2>Microchipping</h2>
          <p>Quick, painless ID chips so your pet always finds its way home.</p>
        </li>
      </ul>
      <a href="/appointment" class="btn-primary" data-link>Book an appointment</a>
    </section>
  `}var p=`https://webhook.site/71106c06-83a9-4d36-b883-cba65a181f4e`,m=`booking-sync`;function h(){return setTimeout(g,0),`
    <section class="page">
      <h1>Book an Appointment</h1>
      <p>Fill in the form below and we'll confirm by email.</p>

      <div id="form-status" role="status" aria-live="polite" class="form-status"></div>

      <form class="appointment-form" id="booking-form" novalidate>
        <div class="form-field">
          <label for="name">Your name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
            aria-required="true"
            aria-describedby="name-error"
          />
          <span id="name-error" class="error-message" aria-live="polite"></span>
        </div>

        <div class="form-field">
          <label for="pet">Pet name</label>
          <input
            type="text"
            id="pet"
            name="pet"
            placeholder="Pet Name"
            required
            aria-required="true"
            aria-describedby="pet-error"
          />
          <span id="pet-error" class="error-message" aria-live="polite"></span>
        </div>

        <div class="form-field">
          <label for="petType">Pet type</label>
          <select
            id="petType"
            name="petType"
            required
            aria-required="true"
            aria-describedby="petType-error"
          >
            <option value="">Select…</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="other">Other</option>
          </select>
          <span id="petType-error" class="error-message" aria-live="polite"></span>
        </div>

        <div class="form-field">
          <label for="date">Preferred date</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            aria-required="true"
            aria-describedby="date-error"
          />
          <span id="date-error" class="error-message" aria-live="polite"></span>
        </div>

        <div class="form-field">
          <label for="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            required
            aria-required="true"
            aria-describedby="email-error"
          />
          <span id="email-error" class="error-message" aria-live="polite"></span>
        </div>

                <div class="form-field">
          <label for="note">Special Note</label>
          <textarea name="note" id="note" placeholder="Special Note"></textarea>
          <span id="email-error" class="error-message" aria-live="polite"></span>
        </div>

        <button type="submit" class="btn-primary">Request appointment</button>
      </form>
    </section>
  `}function g(){let e=document.getElementById(`booking-form`);if(!e)return;let t={name:{input:document.getElementById(`name`),error:document.getElementById(`name-error`),validate:e=>e.trim().length>=2?``:`Please enter your name.`},pet:{input:document.getElementById(`pet`),error:document.getElementById(`pet-error`),validate:e=>e.trim().length>=1?``:`Please enter your pet's name.`},petType:{input:document.getElementById(`petType`),error:document.getElementById(`petType-error`),validate:e=>e?``:`Please choose a pet type.`},date:{input:document.getElementById(`date`),error:document.getElementById(`date-error`),validate:e=>e?e>=new Date().toISOString().split(`T`)[0]?``:`Please choose a future date.`:`Please choose a date.`},email:{input:document.getElementById(`email`),error:document.getElementById(`email-error`),validate:e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)?``:`Please enter a valid email address.`}};function n(e){let{input:n,error:r,validate:i}=t[e],a=i(n.value);return a?(n.setAttribute(`aria-invalid`,`true`),r.textContent=a,!1):(n.setAttribute(`aria-invalid`,`false`),r.textContent=``,!0)}function r(){return Object.keys(t).every(e=>n(e))}Object.keys(t).forEach(e=>{t[e].input.addEventListener(`input`,()=>n(e)),t[e].input.addEventListener(`blur`,()=>n(e))}),e.addEventListener(`submit`,async n=>{if(n.preventDefault(),!r()){Object.values(t).find(e=>e.input.getAttribute(`aria-invalid`)===`true`)?.input.focus();return}await _(Object.fromEntries(new FormData(e).entries()),e)})}async function _(e,t){let n=document.getElementById(`form-status`),r={...e,submittedAt:new Date().toISOString()};try{let e=await fetch(p,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(r)});if(!e.ok)throw Error(`Server returned ${e.status}`);n.textContent=`✅ Appointment requested! We'll be in touch.`,n.className=`form-status form-status--success`,t.reset(),b()}catch{await v(r),await y(),n.textContent=`📴 You're offline. Your request is saved locally and will send when you're back online.`,n.className=`form-status form-status--pending`,t.reset(),b()}}function v(e){return new Promise((t,n)=>{let r=indexedDB.open(`pawpals-bookings`,1);r.onupgradeneeded=()=>{r.result.createObjectStore(`bookings`,{keyPath:`id`,autoIncrement:!0})},r.onsuccess=()=>{let i=r.result.transaction(`bookings`,`readwrite`);i.objectStore(`bookings`).add({url:p,data:e}),i.oncomplete=()=>t(),i.onerror=()=>n(i.error)},r.onerror=()=>n(r.error)})}async function y(){if(`serviceWorker`in navigator&&`SyncManager`in window){let e=await navigator.serviceWorker.ready;try{await e.sync.register(m)}catch(e){console.log(`Sync registration failed:`,e)}}}function b(){document.querySelectorAll(`.error-message`).forEach(e=>e.textContent=``),document.querySelectorAll(`input, select`).forEach(e=>e.setAttribute(`aria-invalid`,`false`))}function x(){return setTimeout(S,0),`
    <section class="page">
      <h1>Pet Products</h1>
      <p>Browse our recommended products. This list works offline after your first visit.</p>
      <div id="products-status">Loading products…</div>
      <ul id="products-list" class="service-list"></ul>
    </section>
  `}async function S(){let e=document.getElementById(`products-status`),t=document.getElementById(`products-list`);if(e&&t)try{let n=await fetch(`https://dummyjson.com/products?limit=6`);if(!n.ok)throw Error(`Bad response`);let r=await n.json();e.textContent=``,t.innerHTML=r.products.map(e=>`
        <li>
          <h2>${e.title}</h2>
          <p>${e.description?.slice(0,80)??``}…</p>
        </li>
      `).join(``)}catch(t){e.innerHTML=`
      <p style="color:#b3261e">
        Couldn't load products. You may be offline and this data hasn't been cached yet.
      </p>
    `,console.error(t)}}function C(){return`
    <section class="page page-not-found">
      <h1>404 — Page not found</h1>
      <p>We couldn't find that page. Maybe one of our cats knocked it off the desk.</p>
      <a href="/" class="btn-primary" data-link>Back to Home</a>
    </section>
  `}var w=`modulepreload`,T=function(e){return`/PawPals/`+e},E={},D=function(e){return e.pathname.endsWith(`.css`)},O=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=T(t,n);let r=s(t);if(r.href in E)return;E[r.href]=!0;let i=D(r);if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let o=document.createElement(`link`);if(o.rel=i?`stylesheet`:w,i||(o.as=`script`),o.crossOrigin=``,o.href=r.href,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),i)return new Promise((e,t)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${r}`)))})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},k=`true`,A=`false`,j=k===`true`,M=A===`true`;function N(e={}){let{immediate:t=!1,onNeedReload:n,onNeedRefresh:r,onOfflineReady:i,onRegistered:a,onRegisteredSW:o,onRegisterError:s}=e,c,l,u,d=async(e=!0)=>{await l,j||u?.()};async function f(){if(`serviceWorker`in navigator){if(c=await O(async()=>{let{Workbox:e}=await import(`./workbox-window.prod.es5-Bd17z0YL.js`);return{Workbox:e}},[]).then(({Workbox:e})=>new e(`/PawPals/sw.js`,{scope:`/PawPals/`,type:`classic`})).catch(e=>{s?.(e)}),!c)return;if(u=()=>{c?.messageSkipWaiting()},!M){if(j)c.addEventListener(`activated`,e=>{(e.isUpdate||e.isExternal)&&(n?n():window.location.reload())}),c.addEventListener(`installed`,e=>{e.isUpdate||i?.()});else{let e=!1,t=()=>{e=!0,c?.addEventListener(`controlling`,e=>{e.isUpdate&&(n?n():window.location.reload())}),r?.()};c.addEventListener(`installed`,n=>{n.isUpdate===void 0?n.isExternal===void 0?!e&&i?.():n.isExternal?t():!e&&i?.():n.isUpdate||i?.()}),c.addEventListener(`waiting`,t)}}c.register({immediate:t}).then(e=>{o?o(`/PawPals/sw.js`,e):a?.(e)}).catch(e=>{s?.(e)})}}return l=f(),d}N({immediate:!0}),n(`/`,d),n(`/services`,f),n(`/appointment`,h),n(`/products`,x),n(`*`,C),u();