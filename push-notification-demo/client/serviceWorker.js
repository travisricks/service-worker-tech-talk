self.addEventListener('push', event => {
    const data = event.data.json();

    self.registration.showNotification(data.title, {
      body: 'Yay it works!',
      image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
    });
  });