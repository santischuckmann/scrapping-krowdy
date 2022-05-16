import { $ } from "../functions/selector.js";
import waitForElement from "../functions/waitForElement.js";
import SELECTORS from "./selectors.js";
import gatherAndDeleteNulls from "../functions/gatherAndDeleteNulls.js";


waitForElement('h1')
   .then(()=>{
         const contactLinkedIn = $(SELECTORS.profile.css.inside.linkedIn).textContent
         const contactEmail = $(SELECTORS.profile.css.inside.email).href
         const contactPhone = $(SELECTORS.profile.css.inside.phoneNumber).textContent

         const contactInfo = gatherAndDeleteNulls(contactEmail, contactPhone, contactLinkedIn);

         let port = chrome.runtime.connect({name:"safePort"})
         port.postMessage({contactInfo})
   })
   .catch(()=>{console.log("intentelo mas tarde")})
