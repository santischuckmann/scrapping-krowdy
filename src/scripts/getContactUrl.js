import { $ } from "../functions/selector.js"
import waitForElement from "../functions/waitForElement.js"
import SELECTORS from "./selectors.js"

waitForElement("h1")
    .then(()=>{
      const contactPortUrl = $(SELECTORS.profile.css.contactInfo).href

      console.log(contactPortUrl)
        
      let port = chrome.runtime.connect({name:"contactPortUrl"})
      port.postMessage({contactPortUrl})

  }).catch(()=>{console.log("intentelo mas tarde")})
