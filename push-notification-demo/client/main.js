// this function is required because when using the VAPID key in your web app, you'll need to convert the URL safe base64 string to a Uint8Array to pass into the subscribe call
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const publicVapidKey = "BC_D4miyirzyQbrU3wZFv1rkQhiTjJKW6gCPSzct7y0PpRGpPqKMTj6jLfUlGTEm1rK6K7bGFgLYzdEtf0JO7w4";

const triggerPush = document.querySelector(".trigger-push");

async function triggerPushNotification() {
  if ("serviceWorker" in navigator) {
    const register = await navigator.serviceWorker.register(
      "/serviceWorker.js",
      {
        scope: "/"
      }
    );

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    await fetch("/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json"
      }
    });
  } else {
    console.error("Service workers are not supported in this browser");
  }
}

triggerPush.addEventListener("click", () => {
  triggerPushNotification().catch(error => console.error(error));
});
