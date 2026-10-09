export function appointmentPage() {
  return `
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
  `;
}