document.getElementById('message-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const messageInput = document.getElementById('message');
  const message = messageInput.value;

  // Replace this with your Discord webhook URL
  const webhookUrl = 'https://discord.com/api/webhooks/1154673897782902854/sUI5AAm44Pk3-GzEv97t_fXcD6IRj2-JJ72Mj3Q5yzNXpoGjiLfm14fje1xJPG57mLC6';

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
