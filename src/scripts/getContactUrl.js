import { $ } from "../functions/selector.js"
import waitForElement from "../functions/waitForElement.js"
import SELECTORS from "./selectors.js"

waitForElement("h1")
    .then(()=>{
      const contactPortUrl = $(SELECTORS.profile.css.contactInfo).href
            
      let port = chrome.runtime.connect({name:"contactPortUrls"})
      port.postMessage({contactPortUrl})

  }).catch(()=>{console.log("intentelo mas tarde")})
