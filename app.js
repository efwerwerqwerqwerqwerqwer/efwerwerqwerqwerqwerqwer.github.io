// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(() => {
    console.log('Service Worker registered successfully.');
  }).catch((error) => {
    console.log('Service Worker registration failed:', error);
  });
}

// Handle form submission and send messages to the Discord webhook
document.getElementById('message-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const messageInput = document.getElementById('message');
  const message = messageInput.value;

  const intervalInput = document.getElementById('interval');
  const interval = parseInt(intervalInput.value, 10) * 1000; // Convert to milliseconds

  // Replace this with your Discord webhook URL
  const webhookUrl = 'https://discord.com/api/webhooks/1154673897782902854/sUI5AAm44Pk3-GzEv97t_fXcD6IRj2-JJ72Mj3Q5yzNXpoGjiLfm14fje1xJPG57mLC6';

  const sendMessage = async () => {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message }),
      });

      console.log('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Send the message at the specified interval
  setInterval(sendMessage, interval);
});
