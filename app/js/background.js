chrome.app.runtime.onLaunched.addListener(function() {

  chrome.app.window.create('app/index.html', {
    'width': 1200,
    'height': 800,
    'frame' : 'chrome'
  });
});