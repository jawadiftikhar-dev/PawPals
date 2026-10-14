// src/pages/appointment.js

const WEBHOOK_URL = 'https://webhook.site/71106c06-83a9-4d36-b883-cba65a181f4e'; // webhook.site URL
const SYNC_TAG = 'booking-sync';

export function appointmentPage() {
  setTimeout(initAppointmentForm, 0);

  return `
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
  `;
}

function initAppointmentForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('name-error'),
      validate: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
    },
    pet: {
      input: document.getElementById('pet'),
      error: document.getElementById('pet-error'),
      validate: (v) => (v.trim().length >= 1 ? '' : "Please enter your pet's name."),
    },
    petType: {
      input: document.getElementById('petType'),
      error: document.getElementById('petType-error'),
      validate: (v) => (v ? '' : 'Please choose a pet type.'),
    },
    date: {
      input: document.getElementById('date'),
      error: document.getElementById('date-error'),
      validate: (v) => {
        if (!v) return 'Please choose a date.';
        const today = new Date().toISOString().split('T')[0];
        return v >= today ? '' : 'Please choose a future date.';
      },
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('email-error'),
      validate: (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
          ? ''
          : 'Please enter a valid email address.',
    },
  };

  function validateField(key) {
    const { input, error, validate } = fields[key];
    const message = validate(input.value);

    if (message) {
      input.setAttribute('aria-invalid', 'true');
      error.textContent = message;
      return false;
    } else {
      input.setAttribute('aria-invalid', 'false');
      error.textContent = '';
      return true;
    }
  }

  function validateAll() {
    return Object.keys(fields).every((key) => validateField(key));
  }

  Object.keys(fields).forEach((key) => {
    fields[key].input.addEventListener('input', () => validateField(key));
    fields[key].input.addEventListener('blur', () => validateField(key));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      const firstInvalid = Object.values(fields).find(
        (f) => f.input.getAttribute('aria-invalid') === 'true'
      );
      firstInvalid?.input.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    await submitBooking(data, form);
  });
}

async function submitBooking(data, form) {
  const status = document.getElementById('form-status');
  const payload = { ...data, submittedAt: new Date().toISOString() };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`Server returned ${res.status}`);

    status.textContent = '✅ Appointment requested! We\'ll be in touch.';
    status.className = 'form-status form-status--success';
    form.reset();
    clearErrors();
  } catch (err) {
    await saveToQueue(payload);
    await registerSync();

    status.textContent =
      '📴 You\'re offline. Your request is saved locally and will send when you\'re back online.';
    status.className = 'form-status form-status--pending';
    form.reset();
    clearErrors();
  }
}

function saveToQueue(data) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('pawpals-bookings', 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore('bookings', { keyPath: 'id', autoIncrement: true });
    };
    req.onsuccess = () => {
      const db = req.result;
      const tx = db.transaction('bookings', 'readwrite');
      tx.objectStore('bookings').add({ url: WEBHOOK_URL, data });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    };
    req.onerror = () => reject(req.error);
  });
}

async function registerSync() {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    const reg = await navigator.serviceWorker.ready;
    try {
      await reg.sync.register(SYNC_TAG);
    } catch (err) {
      console.log('Sync registration failed:', err);
    }
  }
}

function clearErrors() {
  document.querySelectorAll('.error-message').forEach((el) => (el.textContent = ''));
  document.querySelectorAll('input, select').forEach((el) =>
    el.setAttribute('aria-invalid', 'false')
  );
}