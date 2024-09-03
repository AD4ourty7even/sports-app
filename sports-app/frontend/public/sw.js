self.addEventListener('push', function(event) {
    const data = event.data.json();
  
    const options = {
      title: data.title,
      body: data.body,
      icon: '/not_icon.png', // Path to your app icon
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  event.waitUntil(
    clients.openWindow('/Dashboard') // Open your app or a specific URL
  );
});
  