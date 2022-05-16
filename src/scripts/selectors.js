const SELECTORS = {
    profile:{
        css:{
            fullname: "h1",
            contactInfo:"#top-card-text-details-contact-info", 
            inside: {
                email: ".ci-email .pv-contact-info__contact-link",
                phoneNumber : ".ci-phone .list-style-none .pv-contact-info__ci-container span:first-child",
                linkedIn: ".pv-profile-section .pv-contact-info__contact-link",
            },
            experience: {
                dates: 'div:nth-child(2) div div:nth-child(3) span[aria-hidden="true"]'
            },
            education: {
                dates:'div:nth-child(2) div a div:nth-child(3) span[aria-hidden="true"]'
            }

        },
        xpath:{
            educationItems: "(//section[.//span[contains(text(),'Educación')]]//ul)[1]/li",
            experiencieItems: "(//section[.//span[contains(text(),'Experiencia')]]//ul)[1]/li"
        }
    },
    search:{
        urlsProfiles:".search-results-container .ph0 ul.reusable-search__entity-result-list > li span.entity-result__title-text a"
    }

}

export default SELECTORS