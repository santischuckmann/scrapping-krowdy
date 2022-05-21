(() => {
  // src/functions/autoscrolling.js
  var autoscrolling = (pixels) => new Promise((resolve, reject) => {
    let pixelstoScroll = pixels;
    console.log(pixelstoScroll);
    const idInterval = setInterval(() => {
      window.scrollTo(0, pixelstoScroll);
      pixelstoScroll += pixels;
      if (pixelstoScroll > document.body.scrollHeight) {
        clearInterval(idInterval);
        resolve(true);
      }
    }, 100);
  });
  var autoscrolling_default = autoscrolling;

  // src/functions/selector.js
  var $ = (selector, node = document) => node.querySelector(selector);
  var $x = (xpath, node = document) => {
    const collection = document.evaluate(xpath, node, null, XPathResult.ANY_TYPE, null);
    let result = collection.iterateNext();
    const elements = [];
    while (result) {
      elements.push(result);
      result = collection.iterateNext();
    }
    return elements;
  };

  // src/functions/waitForElement.js
  var waitForElement = (selector) => new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (!$(selector).element) {
        clearInterval(interval);
        resolve();
      }
    }, 10);
    setTimeout(() => {
      reject();
    }, 1e4);
  });
  var waitForElement_default = waitForElement;

  // src/scripts/selectors.js
  var SELECTORS = {
    profile: {
      css: {
        fullname: "h1",
        contactInfo: "#top-card-text-details-contact-info",
        inside: {
          email: ".ci-email .pv-contact-info__contact-link",
          phoneNumber: ".ci-phone .list-style-none .pv-contact-info__ci-container span:first-child",
          linkedIn: ".pv-profile-section .pv-contact-info__contact-link"
        },
        experience: {
          dates: 'div div:nth-child(2) div div .t-black--light span[aria-hidden="true"]'
        },
        education: {
          dates: 'div div:nth-child(2) div .t-black--light span[aria-hidden="true"]'
        }
      },
      xpath: {
        educationItems: "(//section[.//span[contains(text(),'Educaci\xF3n')]]//ul)[7]/li",
        experienceItems: "(//section[.//span[contains(text(),'Experiencia')]]//ul)[1]/li"
      }
    },
    search: {
      urlsProfiles: ".search-results-container .ph0 ul.reusable-search__entity-result-list > li span.entity-result__title-text a"
    }
  };
  var selectors_default = SELECTORS;

  // src/scripts/scrapper.js
  waitForElement_default("h1").then(async () => {
    autoscrolling_default(30).then(async () => {
      const fullName = $(selectors_default.profile.css.fullname).textContent;
      const experienceItems = $x(selectors_default.profile.xpath.experienceItems);
      const educationItems = $x(selectors_default.profile.xpath.educationItems);
      const experienceTitles = experienceItems.map((element) => $('span[aria-hidden="true"]', element)?.textContent);
      const experienceDates = experienceItems.map((element) => $(selectors_default.profile.css.experience.dates, element)?.textContent);
      const educationTitles = educationItems.map((element) => $('span[aria-hidden="true"]', element)?.textContent);
      const educationDates = educationItems.map((element) => $(selectors_default.profile.css.education.dates, element)?.textContent);
      let port = chrome.runtime.connect({ name: "safePort" });
      port.postMessage({ fullName, experienceTitles, experienceDates, educationTitles, educationDates });
    });
  }).catch(() => {
    console.log("intentelo mas tarde");
  });
})();
