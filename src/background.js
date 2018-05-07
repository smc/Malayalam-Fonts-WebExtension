var browser = browser || chrome;

function getActiveTab(cb) {
  return browser.tabs.query({active: true, currentWindow: true}, cb);
}

function refresh() {
  getActiveTab((tabs) => {
    browser.storage.local.get(['font'], (result) => {
      browser.tabs.sendMessage(tabs[0].id, {font: result.font});
    });
  });
}

browser.tabs.onUpdated.addListener(refresh);
browser.tabs.onActivated.addListener(refresh);
