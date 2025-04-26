const episodes = Array.from({ length: 9 }, (_, i) => i + 1); // Episodes 1-9
const amounts = Array.from({ length: episodes.length }, (_, i) => 34 + i * (33 / (episodes.length - 1))); // $34 to $67, incremental
let currentEpisodeIndex = 0;
const notificationSound = document.getElementById('notificationSound');

function createNotification() {
  const container = document.getElementById('notificationContainer');
  const notification = document.createElement('div');
  notification.className = 'notification';

  const episode = episodes[currentEpisodeIndex];
  const amount = amounts[currentEpisodeIndex].toFixed(2);

  notification.innerHTML = `
    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo">
    <div class="notification-text">
      <p>Netflix</p>
      <p>We just added $${amount} to your balance for completing The Vampire Diaries Episode ${episode}</p>
      <span>Just now</span>
    </div>
  `;

  container.appendChild(notification);

  // Play the notification sound
  notificationSound.currentTime = 0; // Reset to start
  notificationSound.play();

  // Remove notification after animation
  setTimeout(() => {
    notification.remove();
  }, 5000);

  // Move to the next episode, loop back to 0 if at the end
  currentEpisodeIndex = (currentEpisodeIndex + 1) % episodes.length;
}

// Create notifications at intervals
function startNotifications() {
  createNotification();
  setInterval(createNotification, 2000); // New notification every 2 seconds
}

// Start when page loads
window.onload = startNotifications;