export function homePage() {
  return `
    <section class="hero">
      <div class="hero-text">
        <h1>Care for every paw 🐾</h1>
        <p>Your neighbourhood pet clinic — book appointments anytime, even offline.</p>
        <a href="/appointment" class="btn-primary" data-link>Book an appointment</a>
      </div>
      <img class="hero-image" src="pawpals-hero.avif" alt="A happy dog and cat sitting together" width="600" height="400" decoding="async" fetchpriority="high" loading="eager" />
    </section>
  `;
}