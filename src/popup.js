var browser = browser || chrome;

function getActiveTab(cb) {
  return browser.tabs.query({active: true, currentWindow: true}, cb);
}

var btns = document.querySelectorAll('div');
btns.forEach((btn) => {
  btn.onclick = (e) => {
    let name = e.target.id;
    console.log(name);
    getActiveTab((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {font: name});
      browser.storage.local.set({font: name});
      window.close();
    });
  };
});
