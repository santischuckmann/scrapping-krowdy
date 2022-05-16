(() => {
  // src/functions/selector.js
  var $ = (selector, node = document) => node.querySelector(selector);

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
          dates: 'div:nth-child(2) div div:nth-child(3) span[aria-hidden="true"]'
        },
        education: {
          dates: 'div:nth-child(2) div a div:nth-child(3) span[aria-hidden="true"]'
        }
      },
      xpath: {
        educationItems: "(//section[.//span[contains(text(),'Educaci\xF3n')]]//ul)[1]/li",
        experiencieItems: "(//section[.//span[contains(text(),'Experiencia')]]//ul)[1]/li"
      }
    },
    search: {
      urlsProfiles: ".search-results-container .ph0 ul.reusable-search__entity-result-list > li span.entity-result__title-text a"
    }
  };
  var selectors_default = SELECTORS;

  // src/scripts/getContactUrl.js
  waitForElement_default("h1").then(() => {
    const contactPortUrl = $(selectors_default.profile.css.contactInfo).href;
    let port = chrome.runtime.connect({ name: "contactPortUrls" });
    port.postMessage({ contactPortUrl });
  }).catch(() => {
    console.log("intentelo mas tarde");
  });
})();
