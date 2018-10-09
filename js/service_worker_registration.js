if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service_worker.js')
  .then(function(response) {
    console.log('Service Worker Registration Successful', response);
  }, function(error) {
    console.log('Service Worker Registration Failed', error);
  });
}