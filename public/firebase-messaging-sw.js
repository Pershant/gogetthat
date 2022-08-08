importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js",
);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js",
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    messagingSenderId: "430777166790",
    apiKey: "AIzaSyAp3N344kf3BzEcfOYw4pIi6TeKfg6eFJM",
    projectId: "mender-1f0ef",
    appId: "1:430777166790:web:397cce16578e932d3d60c7",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    var logoIcon = "{{asset('public/assets/website/images/logo_fav.png')}}";
	console.log("logoIcon",logoIcon)
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.message,
        icon: logoIcon,
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});
