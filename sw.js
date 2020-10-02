'use strict';


const applicationServerPublicKey = 'BMaJhM1gvvOwfHHhaOS5M75sDaziWcCcLsDFiorLq41F7FRXybwAR6SbMkxZCl0Hs0Rzk6SCKY-bQDIp48JqvNw';
/* eslint-enable max-len */

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  const notification = event.data.json()
  event.waitUntil(self.registration.showNotification(notification.title, notification.options));
});

self.addEventListener('notificationclick', function(event) {
  /*console.log('[Service Worker] Notification click Received.');
  console.log(event)
  event.notification.close();

  event.waitUntil(
    clients.openWindow('/commandes/')
  );*/
});

self.addEventListener('pushsubscriptionchange', function(event) {
  /*console.log('[Service Worker]: \'pushsubscriptionchange\' event fired.');
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  event.waitUntil(
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(newSubscription) {
      // TODO: Send to application server
      console.log('[Service Worker] New subscription: ', newSubscription);
    })
  );*/
});
