import autoscrolling from "../functions/autoscrolling.js";
import { $, $x } from "../functions/selector.js";
import waitForElement from "../functions/waitForElement.js";
import SELECTORS from "./selectors.js";

waitForElement('h1')
   .then( async () => {
      autoscrolling(30).then( async ()=>{
        const fullName = $(SELECTORS.profile.css.fullname).textContent
        const experienceItems = $x(SELECTORS.profile.xpath.experiencieItems)
        const educationItems = $x(SELECTORS.profile.xpath.educationItems)
         
        const experienceTitles = experienceItems
                                    .map(element => $('span[aria-hidden="true"]',element)?.textContent);
         
         const experienceDates = experienceItems.map(element => $(SELECTORS.profile.css.experience.dates, element)?.textContent)
         
         const educationTitles  = educationItems
                                    .map(element=> $('span[aria-hidden="true"]',element)?.textContent)
         
         const educationDates = educationItems.map(element => $(SELECTORS.profile.css.education.dates, element)?.textContent)

         let port = chrome.runtime.connect({name:"safePort"})
         port.postMessage({fullName, experienceTitles, experienceDates, educationTitles, educationDates})
      })
   })
   .catch(()=>{console.log("intentelo mas tarde")})
