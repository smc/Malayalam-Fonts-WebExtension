var CURRENT_FONT = 'Karumbi';

function css( element, property ) {
  return window.getComputedStyle( element, null ).getPropertyValue( property );
}

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


function checkAndAdd(node) {
  let text = node.textContent;
  if (!text) {
    return;
  }
  // Apply only if malayalam text is found
  if (!text.match(/[\u{0D01}-\u{0D7F}]/gu)) {
    return;
  }

  let font = css(node, 'font-family');
  if (font.search(CURRENT_FONT) === -1) {
    node.setAttribute("style", `font-family: ${CURRENT_FONT}, ${font};`);
    console.log('adding font');
  }
}


// DOM load method
var allElements = [...document.getElementsByTagName("*")]
allElements.forEach((el) => checkAndAdd(el));


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
