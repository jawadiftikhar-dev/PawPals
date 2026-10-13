// src/booking-queue.js

const WEBHOOK_URL = 'https://webhook.site/71106c06-83a9-4d36-b883-cba65a181f4e';
const SYNC_TAG = 'booking-sync';

export async function submitBooking(data, form) {
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