export function servicesPage() {
  return `
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
  `;
}