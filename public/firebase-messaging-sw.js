if (typeof importScripts === "function") {
  importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
  importScripts(
    "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
  );

  self.addEventListener("install", function(e) {
    console.log("installed SW!");
    self.skipWaiting();
  });

  self.addEventListener("activate", function(e) {
    console.log("FCM SW activated");
  });

  const firebaseApp = firebase.initializeApp({
    apiKey: process.env.VITE_FCM_API_KEY,
    authDomain: process.env.VITE_FCM_AUTH_DOMAIN,
    projectId: process.env.VITE_FCM_PROJECT_ID,
    storageBucket: process.env.VITE_FCM_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FCM_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FCM_APP_ID,
    measurementId: process.env.VITE_FCM_MEASUREMENT_ID,
  });

  firebase.messaging(firebaseApp);

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(payload => {
    const notificationTitle = payload.title;
    const notificationOptions = {
      body: payload.body,
      // icon: payload.icon
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  });

  // Web Push 알림 클릭 핸들러
  self.addEventListener("notificationclick", function(event) {
    console.log("notification click");
    const url = "/";
    event.notification.close();
    event.waitUntil(clients.openWindow(url));
  });
}
