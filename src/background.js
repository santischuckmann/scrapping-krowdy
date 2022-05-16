import URLS from "./config.js"
import { db } from "./lib/db.js"

let tabId;

chrome.action.onClicked.addListener(tab => {
    chrome.tabs.create({
        url: URLS.base
    }, tab => {
        tabId = tab.id
        chrome.scripting.executeScript({
            target:{tabId: tab.id},
            files:["./scripts/getUrls.js"]
        })
    })
   
})

let guardian = 0;
let urls;

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

chrome.runtime.onConnect.addListener(port=>{
    if(port.name==="safePort"){
        port.onMessage.addListener(async message=>{

            await db.profiles.add(message)
            console.log("datos guardados en indexdb")
            console.log(guardian)
            if(guardian < urls.length) {
                await chrome.tabs.update(tabId,{url:urls[guardian]})
    
    
                setTimeout(()=>{
                    chrome.scripting.executeScript({
                        target: {tabId:tab.id},
                        files: ['./scripts/scrapper.js']    
                    }) 
                } , 5000)
    
                guardian++

            }
            /* fetch("http://localhost:3000/profiles",{
                method: "POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(message)
            }).then(response=>response.json())
                .then(data=>console.log(data))
                .catch(error=>console.log(error)) */
        })
    }else if(port.name==="safePortUrls"){
        port.onMessage.addListener(async message=>{
            
            urls = message.urlsProfiles 
            
            const [url] = urls
            await chrome.tabs.update(tabId,{url})


            setTimeout(()=>{
                chrome.scripting.executeScript({
                    target: {tabId: tab.id},
                    files: ['./scripts/getContactUrl.js']    
                }) 
            },5000)
            guardian++  
        })
    } else if (port.name === "contactPortUrl") {
        port.onMessage.addListener(async message=>{
            
            const url = message.contactPortUrl
            const urlActual = getCurrentTab();

            await chrome.tabs.update(tabId,{url})

            setTimeout(()=>{
                chrome.scripting.executeScript({
                    target: {tabId: tab.id},
                    files: ['./scripts/contactScrapper.js']    
                }) 
            }, 5000)
            setTimeout(async () => {
                await chrome.tabs.update(tabId, urlActual)
            }, 3000)
            guardian++
        })
    }
})


