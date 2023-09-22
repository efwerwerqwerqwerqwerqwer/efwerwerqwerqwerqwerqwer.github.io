document.getElementById('message-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const messageInput = document.getElementById('message');
  const message = messageInput.value;

  // Replace this with your Discord webhook URL
  const webhookUrl = 'https://discord.com/api/webhooks/...';

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: message }),
    });

    messageInput.value = '';
    alert('Message sent!');
  } catch (error) {
    console.error('Error sending message:', error);
    alert('Failed to send message.');
  }
});
