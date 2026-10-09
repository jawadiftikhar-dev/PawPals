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
  `}function p(){return`
    <section class="page">
      <h1>Book an Appointment</h1>
      <p>Fill in the form below and we'll confirm by email. Offline booking coming soon.</p>
      <form class="appointment-form" novalidate>
        <label>
          Your name
          <input type="text" name="name" required placeholder="Your Name" />
        </label>
        <label>
          Pet name
          <input type="text" name="pet" required placeholder="Pet Name" />
        </label>
        <label>
          Preferred date
          <input type="date" name="date" required />
        </label>
        <label>
          Reason for visit
          <textarea name="reason" rows="4" placeholder="Reason"></textarea>
        </label>
        <button type="submit" class="btn-primary">Request appointment</button>
      </form>
    </section>
  `}function m(){return`
    <section class="page page-not-found">
      <h1>404 — Page not found</h1>
      <p>We couldn't find that page. Maybe one of our cats knocked it off the desk.</p>
      <a href="/" class="btn-primary" data-link>Back to Home</a>
    </section>
  `}n(`/`,d),n(`/services`,f),n(`/appointment`,p),n(`*`,m),u();