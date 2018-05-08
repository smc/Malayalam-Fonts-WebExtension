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

function setIcon(prop) {
  let name = prop.icon;

  browser.browserAction.setIcon({ path: `icons/icon-${name}.png` });
}


browser.tabs.onUpdated.addListener(refresh);
browser.tabs.onActivated.addListener(refresh);
browser.runtime.onMessage.addListener(setIcon);
