// public/sw-sync.js — runs inside the generated service worker

self.addEventListener('sync', (event) => {
    if (event.tag === 'booking-sync') {
        event.waitUntil(replayBookings());
    }
});

async function replayBookings() {
    const db = await openDB();
    const tx = db.transaction('bookings', 'readwrite');
    const store = tx.objectStore('bookings');
    const all = await store.getAll();

    for (const entry of all) {
        try {
            const res = await fetch(entry.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entry.data),
            });

            if (res.ok) {
                await store.delete(entry.id);
            }
        } catch (err) {
            // Network still failing — leave in queue for next sync
            console.log('Replay failed, will retry:', err);
        }
    }
}

function openDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open('pawpals-bookings', 1);
        req.onupgradeneeded = () => {
            const db = req.result;
            if (!db.objectStoreNames.contains('bookings')) {
                db.createObjectStore('bookings', { keyPath: 'id', autoIncrement: true });
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}