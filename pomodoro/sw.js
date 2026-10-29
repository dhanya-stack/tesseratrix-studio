// Offline-first cache for the Pomodoro beta. Versioned to avoid stale updates.
const CACHE = 'pomodoro-v5-3-1-upright-mascot';
const FILES = ['./', './index.html', './manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png',
'./assets/tomato_0.png','./assets/tomato_1.png','./assets/tomato_2.png','./assets/tomato_3.png','./assets/tomato_4.png','./assets/tomato_happy.png','./assets/tomato_ripe_open.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('pomodoro-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith(fetch(event.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(event.request,copy)).catch(()=>{})}return r}).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(clients=>{if(clients[0])return clients[0].focus();return self.clients.openWindow('./index.html')}))});
