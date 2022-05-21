import URLS from "./config.js"
import { db } from "./lib/db.js"

let tabId;


chrome.action.onClicked.addListener(tab => {
    chrome.tabs.create({
        url: URLS.base
    }, tab => {
        tabId = tab.id
        chrome.scripting.executeScript({
            target:{tabId},
            files:["./scripts/getUrls.js"]
        })
    })
   
})

let contactInfo;
let guardian = 0;
let urls;


chrome.runtime.onConnect.addListener(port => {
    if(port.name==="safePortUrls"){
        port.onMessage.addListener(async message=>{
            
            urls = message.urlsProfiles
            const [url] = urls

            await chrome.tabs.update(tabId,{url})

            setTimeout(()=>{
                chrome.scripting.executeScript({
                    target: {tabId},
                    files: ['./scripts/getContactUrl.js']    
                }) 
            },5000)
        })
    } 
})

export default urls;

chrome.runtime.onConnect.addListener(port=>{
    if(port.name==="safePort"){
        port.onMessage.addListener(async message=>{

            sendToDb = {...message, contactInfo}

            try {
                await db.profiles.add(sendToDb)
                console.log("datos guardados en indexdb")
            } catch (error) {
                console.log(error)
            }

            if(guardian < urls.length) {
                await chrome.tabs.update(tabId,{url:urls[guardian + 1]})
                setTimeout(()=>{
                    chrome.scripting.executeScript({
                    target: {tabId},
                    files: ['./scripts/getContactUrl.js']    
                    }) 
                } , 7000)

                guardian++
            }
        })

    } else if(port.name==="contactSafePort"){
        port.onMessage.addListener(async message=>{

            contactInfo = message;
            await chrome.tabs.update(tabId,{url:urls[guardian]})
            console.log({url:urls[guardian]})
            setTimeout(()=>{
                chrome.scripting.executeScript({
                target: {tabId},
                files: ['./scripts/scrapper.js']    
                }) 
            } , 5000)
    })

    } else if (port.name === "contactPortUrl") {
        port.onMessage.addListener(async message => {
            
            const url = message.contactPortUrl
            
            await chrome.tabs.update(tabId, {url})

            setTimeout(()=>{
                chrome.scripting.executeScript({
                    target: {tabId},
                    files: ['./scripts/contactScrapper.js']    
                }) 
            }, 2000)          
        })
    }
})


