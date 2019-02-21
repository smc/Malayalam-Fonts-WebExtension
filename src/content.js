var browser = browser || chrome;

const FONTS = {
  'meera': 'Meera',
  'rachana': 'Rachana',
  'manjari': 'Manjari',
  'anjali':  'AnjaliOldLipi',
  'suruma': 'Suruma',
  'raghu': 'RaghuMalayalam',
  'dyuthi': 'Dyuthi',
  'keraleeyam': 'Keraleeyam',
  'uroob': 'Uroob',
  'chilanka': 'Chilanka',
  'karumbi': 'Karumbi',
  'gayathri': 'Gayathri',
}

function css(element, property) {
  return window.getComputedStyle(element, null).getPropertyValue(property);
}

function checkAndAdd(node, CURRENT_FONT) {
  let font = css(node, 'font-family');
  if (font.search(CURRENT_FONT) === -1) {
    node.setAttribute("style", `font-family: ${CURRENT_FONT}, ${font} !important;`);
  }
}

function updateFont(request, sender, response) {
  let font = request.font || 'meera';

  browser.runtime.sendMessage({icon: font});
  if (font === 'disable') {
    return;
  }

  let nodeIterator = document.createNodeIterator(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    function(node) {
      let text = node.textContent;
      if (!text ||!text.match(/[\u{0D01}-\u{0D7F}]/gu)) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  );
  let currentNode;
  while (currentNode = nodeIterator.nextNode()) {
    checkAndAdd(currentNode, FONTS[font]);
  }
};




/*
// CSS Method
var allStyle = [...document.styleSheets];
allStyle.forEach((sheet) => {
  var rules = sheet.cssRules || sheet.rules;

  [...rules].forEach((rule) => {
    let font = rule.style && rule.style.fontFamily;

    if (rule.style) {
      //rule.style.color = 'red';
      if (font) {
        //console.log('font', font, typeof font, rule.style.cssText);
        rule.style.cssText = rule.style.cssText.replace('font-family:', `font-family: ${CURRENT_FONT},`);
        rule.style.fontFamily = `${CURRENT_FONT}, ${font}`;
        //console.log('final', rule.style.fontFamily);
      } else {
        rule.style.fontFamily = CURRENT_FONT;
      }
    }
  });
});
*/

/*
// Mutation method
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function(mutations, observer) {
  mutations.forEach((mut) => {
    console.log(mut);
    mut.addedNodes.forEach((el) => checkAndAdd(el));
  });
});

observer.observe(document, {
    subtree: true,
    attributes: false,
    childList: true,
    characterData: true,
    attributeOldValue: false,
    characterDataOldValue: true
});
*/

browser.runtime.onMessage.addListener(updateFont);
