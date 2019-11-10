export default function(message, timeout=950) {
  chrome.notifications.create("screenshot", {
    iconUrl: "/images/camera48.png",
    type: "basic",
    title: "Screenshot",
    message: message
  }, (notifID) => {
    setTimeout(() => chrome.notifications.clear(notifID), timeout);
  });
};
