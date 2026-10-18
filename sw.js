// CineVerse service worker: shows movie suggestions even when the site is closed.
// Keep this file next to index.html. The icons are built in, so no other files are needed.
const ICON='data:image/png;base64,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',BADGE='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAEYUlEQVR42u2dzW8WVRSHn1ve0g9KjLhQCgQFQhDBFiOJXwhG40YXxrVuNKwU1IVuXBANGomx4V9wY0yMNS5coUatgsREwES0BQtpkBRIm6ChLZX052Ju4sIPnOmZ977zznmSN026OHPn/OZ+nZlzLjiO4ziO4ziO4ziO4ziO49SBUMVGS1oKbAW2AbcBa+KvH1gG9MRfF/AHMAdcAS7F3wRwChgDjoUQzrgA/+3wTuBB4DFgF7AF6DS8xBRwBPgUOBRCOOl9M3P8LknvSfpNzWVU0n5Jm+vo9C5JeyT9pNbga0lPxV7Y1o5fIukZSRNqTSYk7W3LOUDSNuDdOLG2MldDCN2WBjsSO74haR9wtALOL4VGQuevAIaBnXVeaDQSOX8j8Amwoe4rvUYC528FvgBW+EK7yXNAfPIPufMTCCCpP+40b3a3N3kIkrQEeD/Ga8piDPgS+BY4DZwFLscYUAfQC/QBq4FVwOYYS9oe/9fWm6y3Stoc/S5pSNLAItu3SdILkg5f53pzVXT+A5IWjB1/TdLBuJS1bu86SQckTVdegBheOG7s/DOS7m5C25dJeknSpSoL8HwJgbGbmnwPyyW9Jmm2UgLEqOaksfP7Et7PeknDVRJgt6HzfyljvG/nVU+QdNLI+fOSBt2r+QS43/Dp3+8ezS/AQSPnT0rq8VBEzuEHeNLI3NshhFl/pPMJMGD09M9KusGDcfm518jORyGEyy5AOgE+rsOIUYYA2w1sLJCFrl2AnON/B7DewNSpEMKUC5CffmCpgZ3jdVm0WAtwq5GdURegGCuN7PzqAhSj18jOpAuQVoAZFyCtAHMuQFrkAhTDKnDW7QKkHbt7XYBiXDGyc4sLkHb5uMoFKIZVuucmF6AY54F5AzsDLkABQggLwLiBqY11+QyljH3Ad0btesQFKMYRIztP4BTYwkqDRi/lZ/ylfDFOAOcM7PQAz7oA+SdiAR8amXvZP8wqxgeGO+JXfWDPPw8Ew2Ib84tNQapdD4jD0JCRuU5g2D9Pz98LuiVdMPxKeiRxgsa6SiVoxEbvMU5RGml2T5DUJ2lfXBZXMknvhLEI401K0uuV9KKki1VPU91RUprqkKQbS2jvWklvSppqizzheFMHSkzUficWAFlM+zZIek7SV9d5WMwFCE0SoAF8Duwo8TKjZFVYjpKVpDxLVqpgJq72eoDlZC97VgO3A4NkHxOv/Z/XMK+YFZrYC/rJ6jisobpUt2RZCOE8WYj5gi/SEwgQRRgDHgWm3fUJBIgi/ADcR1ZSxgVIcdEQwihwDzDiAiQiZsA8DLwOXKurAK1SuPUussKtW3wVlKY3fB/X5LuxeZtWBueAV9q+S8Yo6l5JP7dIzehvJD3d9sW7/0WMhxKVrx+T9EYzytdX6QCHncDj8e8d2B7gMA0cBj4jO8Dhx1pNwgUE6QLu5O9HmKzkn48wucpfR5hcJDvC5HSMHx0LIYzjOI7jOI7jOI7jOI7jOI7jlMife/cguvim004AAAAASUVORK5CYII=';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data.json(); } catch (_) { d = { body: e.data ? e.data.text() : '' }; }
  const opts = {
    body: d.body || '',
    icon: ICON,
    badge: BADGE,
    image: d.image || undefined,
    tag: d.tag || 'cineverse',
    data: { url: d.url || './', t: d.t || null },
  };
  e.waitUntil(self.registration.showNotification(d.title || 'CineVerse', opts));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const data = e.notification.data || {};
  const url = new URL(data.url || './', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) {
      if (c.url.startsWith(self.registration.scope)) { c.focus(); c.postMessage({ t: data.t }); return; }
    }
    return self.clients.openWindow(url);
  }));
});
