export function homePage() {
  return `
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
  `;
}