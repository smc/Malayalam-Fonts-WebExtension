var browser = browser || chrome;

function getActiveTab(cb) {
  return browser.tabs.query({active: true, currentWindow: true}, cb);
}

var btns = document.querySelectorAll('div');
btns.forEach((btn) => {
  btn.onclick = (e) => {
    let name = e.target.id;
    getActiveTab((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {font: name});
      browser.storage.local.set({font: name});
      window.close();
    });
  };
});

browser.storage.local.get(['font'], (result) => {
  let btn = document.getElementById(result.font);
  btn.classList.add('active');
});
