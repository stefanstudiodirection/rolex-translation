const fetchPromise = fetch(translationFile)
    .then(response => response.json())
    .then(data => translationData = data)
    .catch(error => console.log('Error fetching translation data:', error));


const menuButton = document.querySelector('.header__menu-button.w-nav-button');
const menuObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const classes = mutation.target.classList;
            if (classes.contains('w--open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    }
});
menuObserver.observe(menuButton, {attributes: true});

let isSubmitting = false;

function submitForm(event) {
   if (isSubmitting) {
       return;
   }

   event.preventDefault();
   isSubmitting = true;

   const form = event.target;

   // Get language from URL
   const url = window.location.href;
   const urlParts = url.split('/');
   let lang = "rs-en";
   for (const part of urlParts) {
     if (part.length === 5 && part.includes('-')) {
       lang = part;
       break;
     }
   }

   // Get form values
   const emailTo = document.getElementById("Email-2").value;
   const titleValue = document.getElementById("Title").value;
   let title = titleValue;

   if (lang === 'rs-sr' || lang === 'me-me') {
     title = (titleValue === 'Sir') ? 'Poštovani' : 'Poštovana';
   }
   if (lang === 'eu-hu') {
     title = (titleValue === 'Sir') ? 'Uram' : 'Hölgyem';
   }

   const firstName = document.getElementById("First-name").value;
   const lastName = document.getElementById("Last-name").value;
   const countryCode = document.getElementById("country__code").value;
   const phoneNumber = document.getElementById("Phone-number").value;
   const country = document.getElementById("country").value;
   const message = document.getElementById("Message").value;

   const jsonData = {
     lang,
     emailTo,
     title,
     firstName,
     lastName,
     countryCode,
     phoneNumber,
     country,
     message,
   };

   // Pošalji na tvoj backend
   fetch("https://www.petitegeneve.com/send-mail/general-inquiry", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(jsonData),
   })
   .then(response => {
       if (response.ok) {
         // Ukloni event listener
         form.removeEventListener('submit', submitForm);
         
         // Pokreni Webflow success ponašanje direktno
         const successDiv = form.querySelector('.w-form-done');
         const formDiv = form.querySelector('.w-form');
         
         if (successDiv && formDiv) {
           formDiv.style.display = 'none';
           successDiv.style.display = 'block';
         }
         
         // Reset flag
         isSubmitting = false;
         
       } else {
           isSubmitting = false;
           alert("Form submission failed. Please try again later.");
       }
   })
   .catch(error => {
       isSubmitting = false;
       console.error("Error:", error);
       alert("Form submission failed. Please try again later.");
   });
}

function submitFormRolexContact() {
    event.preventDefault(); // Prevent the default form submission

    // Get language from the URL
    const url = window.location.href;
    const urlParts = url.split('/');
    let lang = "rs-sr"; // Default language if not found

    for (const part of urlParts) {
        if (part.length === 5 && part.includes('-')) {
            lang = part;
            break;
        }
    }

    // Get email from the input field
    const emailTo = document.getElementById("Email-2").value;

    const titleValue = document.getElementById("Title").value;
    let title = titleValue;

    if (lang == 'rs-sr' || lang == 'me-me') {
        if (titleValue == 'Sir') {
            title = 'Poštovani';
        } else {
            title = 'Poštovana';
        }
    }

    if (lang == 'eu-hu') {
        if (titleValue == 'Sir') {
            title = 'Uram';
        } else {
            title = 'Hölgyem';
        }
    }

    // Get other form values
    const firstName = document.getElementById("First-name").value;
    const lastName = document.getElementById("Last-name").value;
    const countryCode = document.getElementById("country__code").value;
    const phoneNumber = document.getElementById("Phone-number").value;
    const country = document.getElementById("country").value;
    const message = document.getElementById("Message").value;

    // Create JSON object
    const formData = {
        lang,
        emailTo,
        title,
        firstName,
        lastName,
        countryCode,
        phoneNumber,
        country,
        message,
    };

    console.log('body');
    console.log(formData);

    // Make a POST request
    fetch("https://www.petitegeneve.com/send-mail/rolex-contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(response => {
            if (response.ok) {
                alert("Form submitted successfully!");
            } else {
                alert("Form submission failed. Please try again later.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Form submission failed. Please try again later.");
        });
}

function submitFormRolexProducts() {
    event.preventDefault(); // Prevent the default form submission

    // Get language from the URL
    const url = window.location.href;
    const urlParts = url.split('/');
    let lang = "rs-en"; // Default language if not found

    for (const part of urlParts) {
        if (part.length === 5 && part.includes('-')) {
            lang = part;
            break;
        }
    }

    // Get email from the input field
    const emailTo = document.getElementById("Email-2").value;

    const titleValue = document.getElementById("Title").value;
    let title = titleValue;

    if (lang == 'rs-sr' || lang == 'me-me') {
        if (titleValue == 'Sir') {
            title = 'Poštovani';
        } else {
            title = 'Poštovana';
        }
    }

    if (lang == 'eu-hu') {
        if (titleValue == 'Sir') {
            title = 'Uram';
        } else {
            title = 'Hölgyem';
        }
    }

    // Get other form values
    const firstName = document.getElementById("First-name").value;
    const lastName = document.getElementById("Last-name").value;
    const countryCode = document.getElementById("country__code").value;
    const phoneNumber = document.getElementById("Phone-number").value;
    const country = document.getElementById("country").value;
    const message = document.getElementById("Message").value;

    // Get the current link
    const currentLink = window.location.href;

    const ref = document.getElementsByClassName('rolex-text white mobile-dark uppercase')[0].textContent;

    // Create JSON object
    const formData = {
        lang,
        emailTo,
        title,
        firstName,
        lastName,
        countryCode,
        phoneNumber,
        country,
        message,
        currentLink,
        ref,
    };

    console.log('body');
    console.log(formData);

    // Make a POST request
    fetch("https://www.petitegeneve.com/send-mail/rolex-products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(response => {
            if (response.ok) {
                alert("Form submitted successfully!");
            } else {
                alert("Form submission failed. Please try again later.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Form submission failed. Please try again later.");
        });
}

function submitFormJewelryProducts() {
    event.preventDefault(); // Prevent the default form submission

    // Get language from the URL
    const url = window.location.href;
    const urlParts = url.split('/');
    let lang = "rs-en"; // Default language if not found

    for (const part of urlParts) {
        if (part.length === 5 && part.includes('-')) {
            lang = part;
            break;
        }
    }

    // Get email from the input field
    const emailTo = document.getElementById("Email-2").value;

    const titleValue = document.getElementById("Title").value;
    let title = titleValue;

    if (lang == 'rs-sr' || lang == 'me-me') {
        if (titleValue == 'Sir') {
            title = 'Poštovani';
        } else {
            title = 'Poštovana';
        }
    }

    if (lang == 'eu-hu') {
        if (titleValue == 'Sir') {
            title = 'Uram';
        } else {
            title = 'Hölgyem';
        }
    }

    // Get other form values
    const firstName = document.getElementById("First-name").value;
    const lastName = document.getElementById("Last-name").value;
    const countryCode = document.getElementById("country__code").value;
    const phoneNumber = document.getElementById("Phone-number").value;
    const country = document.getElementById("country").value;
    const message = document.getElementById("Message").value;

    // Get the current link
    const currentLink = window.location.href;

    // const ref = document.getElementsByClassName('tudor-single__heading mbm')[0].textContent;

    // Create JSON object
    const formData = {
        lang,
        emailTo,
        title,
        firstName,
        lastName,
        countryCode,
        phoneNumber,
        country,
        message,
        currentLink,
        // ref,
    };
    console.log('body');
    console.log(formData);

    // Make a POST request
    fetch("https://www.petitegeneve.com/send-mail/jewelry-products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(response => {
            if (response.ok) {
                alert("Form submitted successfully!");
            } else {
                alert("Form submission failed. Please try again later.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Form submission failed. Please try again later.");
        });
}

function submitFormTudorProducts() {
    event.preventDefault(); // Prevent the default form submission

    // Get language from the URL
    const url = window.location.href;
    const urlParts = url.split('/');
    let lang = "rs-en"; // Default language if not found

    for (const part of urlParts) {
        if (part.length === 5 && part.includes('-')) {
            lang = part;
            break;
        }
    }

    // Get email from the input field
    const emailTo = document.getElementById("Email-2").value;

    const titleValue = document.getElementById("Title").value;
    let title = titleValue;

    if (lang == 'rs-sr' || lang == 'me-me') {
        if (titleValue == 'Sir') {
            title = 'Poštovani';
        } else {
            title = 'Poštovana';
        }
    }

    if (lang == 'eu-hu') {
        if (titleValue == 'Sir') {
            title = 'Uram';
        } else {
            title = 'Hölgyem';
        }
    }

    // Get other form values
    const firstName = document.getElementById("First-name").value;
    const lastName = document.getElementById("Last-name").value;
    const countryCode = document.getElementById("country__code").value;
    const phoneNumber = document.getElementById("Phone-number").value;
    const country = document.getElementById("country").value;
    const message = document.getElementById("Message").value;

    // Get the current link
    const currentLink = window.location.href;

    const ref = document.getElementsByClassName('tudor-single__heading mbm')[0].textContent;

    // Create JSON object
    const formData = {
        lang,
        emailTo,
        title,
        firstName,
        lastName,
        countryCode,
        phoneNumber,
        country,
        message,
        currentLink,
        ref,
    };

    console.log('body');
    console.log(formData);

    // Make a POST request
    fetch("https://www.petitegeneve.com/send-mail/tudor-products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(response => {
            if (response.ok) {
                alert("Form submitted successfully!");
            } else {
                alert("Form submission failed. Please try again later.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Form submission failed. Please try again later.");
        });
}

function submitFormSwissKubik() {
    event.preventDefault(); // Prevent the default form submission

    // Get language from the URL
    const url = window.location.href;
    const urlParts = url.split('/');
    let lang = "rs-en"; // Default language if not found

    for (const part of urlParts) {
        if (part.length === 5 && part.includes('-')) {
            lang = part;
            break;
        }
    }

    // Get email from the input field
    const emailTo = document.getElementById("Email-2").value;

    const titleValue = document.getElementById("Title").value;
    let title = titleValue;

    if (lang == 'rs-sr' || lang == 'me-me') {
        if (titleValue == 'Sir') {
            title = 'Poštovani';
        } else {
            title = 'Poštovana';
        }
    }

    if (lang == 'eu-hu') {
        if (titleValue == 'Sir') {
            title = 'Uram';
        } else {
            title = 'Hölgyem';
        }
    }

    // Get other form values
    const firstName = document.getElementById("First-name").value;
    const lastName = document.getElementById("Last-name").value;
    const countryCode = document.getElementById("country__code").value;
    const phoneNumber = document.getElementById("Phone-number").value;
    const country = document.getElementById("country").value;
    const message = document.getElementById("Message").value;

    // Get the current link
    const currentLink = window.location.href;

    const ref = document.getElementsByClassName('s-single__name mbm')[0].textContent;

    // Create JSON object
    const formData = {
        lang,
        emailTo,
        title,
        firstName,
        lastName,
        countryCode,
        phoneNumber,
        country,
        message,
        currentLink,
        ref,
    };

    console.log('body');
    console.log(formData);

    // Make a POST request
    fetch("https://www.petitegeneve.com/send-mail/swiss-kubik", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(response => {
            if (response.ok) {
                alert("Form submitted successfully!");
            } else {
                alert("Form submission failed. Please try again later.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Form submission failed. Please try again later.");
        });
}


var regionLanguage;
const urlPath = window.location.pathname;
const langRegion = urlPath.split('/')[1];
const [reg, lang] = langRegion.split('-');
i18next.init({
    lng: lang,
    resources: {
        en: {},
        hu: {},
        sr: {},
        me: {}
    }
});


async function translateQuery(query, sourceLanguage, targetLanguage) {
    try {
        const translationResponse = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(query)}&langpair=${sourceLanguage}|${targetLanguage}`
        );
        const translationData = await translationResponse.json();
        let translatedText = translationData.responseData.translatedText;

        // Replace specific words in the translated text
        translatedText = translatedText.replace(/\bclocks\b/gi, 'watches');
        translatedText = translatedText.replace(/\bhour\b/gi, 'watch');
        translatedText = translatedText.replace(/\on hands.\b/gi, 'Jewlerry');

        return translatedText;
    } catch (error) {
        console.error('Error translating query:', error);
        return query; // Return the original query in case of an error
    }
}

// Function to handle form submission (including Enter key)
async function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the default form submission

    console.log('Handling form submission...'); // Debugging

    const searchForm = event.target; // Get the form that triggered the submission
    console.log('target form: ');
    console.log(event.target);
    const searchInput = searchForm.querySelector('input[type="search"]');
    console.log('Search input:', searchInput.value); // Debugging
    const userQuery = searchInput.value.trim();
    console.log('User query:', userQuery); // Debugging

    // const userLanguage = localStorage.getItem('lang');
    const userLanguage = getLangFromURL();
    // const regValue = getRegFromURL();
    console.log('User language:', userLanguage); // Debugging

    // Translate the user query to English
    const translatedQuery = await translateQuery(userQuery, userLanguage, 'en');
    console.log('Translated Query:', translatedQuery); // Debugging

    // Replace the text in the input field
    searchInput.value = translatedQuery;

    // Submit the form with the translated query
    searchForm.submit();
}


function generateI18nTags() {
    return new Promise(resolve => {
        const elements = document.querySelectorAll(':not(script)');
        elements.forEach(element => {
            const childNodes = Array.from(element.childNodes);
            const hasTextNodes = childNodes.some(node => {
                return node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '';
            });
            const hasElementNodes = childNodes.some(node => {
                return node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() !== 'br';
            });
            const hasLinks = childNodes.some(node => {
                return node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'a';
            });

            if (element.tagName === 'META') {
                const translationKey = element.getAttribute('content');
                element.setAttribute('data-i18n', translationKey);
            } else if (hasTextNodes && hasElementNodes && hasLinks && element.getAttribute('data-i18n') === null) {
                // Create a new string to store the copy of the original innerHTML
                let copyOfInnerHTML = "" + element.innerHTML;

                // Log the original innerHTML to console for debugging
                console.log("Original innerHTML:", copyOfInnerHTML);

                // Use regular expression to replace entire <a ...>...</a> tags with <a*>
                const modifiedCopy = copyOfInnerHTML.replace(/<a\b[^>]*>[\s\S]*?<\/a>/g, "{{LINK}}");

                // Log the modified innerHTML to console for debugging
                console.log("Modified innerHTML:", modifiedCopy);

                // Use modified content for the translationKey
                const translationKey = modifiedCopy.trim();

                // Log the translationKey to console for debugging
                console.log("Translation Key:", translationKey);

                // Set 'data-i18n' attribute to translationKey
                element.setAttribute('data-i18n', translationKey);

            } else if (hasTextNodes && hasElementNodes && element.getAttribute('data-i18n') === null) {
                const shouldExclude = isExcludedElement(element);
                if (!shouldExclude) {
                    const childNodes = Array.from(element.childNodes);
                    childNodes.forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                            const translationKey = node.textContent.trim();
                            const span = document.createElement('span');
                            span.setAttribute('data-i18n', translationKey);
                            const textNode = document.createTextNode(node.textContent);
                            span.appendChild(textNode);
                            element.insertBefore(span, node);
                            element.removeChild(node);
                        }
                    });
                }
            } else if (hasTextNodes && !hasElementNodes && element.getAttribute('data-i18n') === null) {
                const shouldExclude = isExcludedElement(element);
                if (!shouldExclude) {
                    const translationKey = element.innerHTML.trim();
                    element.setAttribute('data-i18n', translationKey);
                }
            }
        });
        translateContent();
        resolve();
    });
}

const observer = new MutationObserver(mutationsList => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const addedNodes = mutation.addedNodes;
            for (const node of addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    generateI18nTags()
                        .then(() => {
                            rewriteRelativeURLs();
                        });
                }
            }
        } else if (mutation.type === 'characterData') {
            const targetNode = mutation.target;
            if (targetNode.nodeType === Node.ELEMENT_NODE) {
                rewriteRelativeURLs()
                generateI18nTags()
                    .then(() => {
                    });
            }
        }
    }
});

function isExcludedElement(element) {
    const tagName = element.tagName.toLowerCase();
    const isPrice = element.getAttribute('id') === 'price_sr' || element.getAttribute('id') === 'price_me' || element.getAttribute('id') === 'price_hu' || element.classList.contains('price-text');
    const isRemainingTime = element.classList.contains('vjs-remaining-time-display');
    const isExcludedTag = ['script', 'html', 'style'].includes(tagName);
    const isComment = element.nodeType === Node.COMMENT_NODE;
    const isFunction = element.nodeType === Node.TEXT_NODE && /^\s*function\s*\(/.test(element.textContent);
    const hasFunction = element.querySelectorAll(':not(script):not(html):not(br)').length > 0;
    const hasComment = element.querySelectorAll(':not(script):not(html):not(br)').length > 0;
    const isPaginationText = element.getAttribute('id') === 'page-container';
    const isLanguageText = element.getAttribute('id') === 'region-language';
    return isExcludedTag || isComment || isFunction || hasFunction || hasComment || isPrice || isPaginationText || isRemainingTime || isLanguageText;
}

function rewriteRelativeURLs() {
    return new Promise((resolve) => {
        const urlPath = window.location.pathname;
        let languageRegion = urlPath.split('/')[1];
        const queryParams = new URLSearchParams(window.location.search);
        const regParam = queryParams.get('reg');
        const langParam = queryParams.get('lang');
        if (regParam) {
            localStorage.setItem('reg', regParam);
        }
        if (langParam) {
            localStorage.setItem('lang', langParam);
        }
        // if (localStorage.getItem('reg') && localStorage.getItem('lang')) {
        if (getLangFromURL() && getRegFromURL()) {
            // const regValue = localStorage.getItem('reg');
            // const langValue = localStorage.getItem('lang');
            const langValue = getLangFromURL();
            const regValue = getRegFromURL();
            languageRegion = regValue + '-' + langValue;
            if (window.location.href.endsWith('/')) {
                setTimeout(() => {
                    window.location.href = '/' + languageRegion + '/home';
                }, 1);
            }
        }
        const relativeLinks = document.querySelectorAll('a[href^="/"]');
        relativeLinks.forEach(link => {
            const siblingLinks = link.parentNode.querySelectorAll('a[id^="geo-"]');
            const containsClass = link.classList.contains('geo-popup__acc-list-link');
            const isLanguageRegionChangeLink = Array.from(siblingLinks).some(siblingLink => siblingLink.id.includes('geo-')) || containsClass;
            if (!isLanguageRegionChangeLink) {
                const href = link.getAttribute('href');
                const updatedHref = href.replace('/rs-en/', `/${languageRegion}/`);
                link.setAttribute('href', updatedHref);
            }
        });
        resolve();
    });
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function translateMetaTagContent(translationKey) {
    return new Promise((resolve, reject) => {
        const checkTranslation = () => {
            if (translationData) {
                // const languageTranslations = translationData[localStorage.getItem('lang')];
                const languageTranslations = translationData[getLangFromURL()];
                if (languageTranslations && translationKey in languageTranslations) {
                    resolve(languageTranslations[translationKey]);
                } else {
                    resolve(null);
                }
            } else {
                setTimeout(checkTranslation, 100);
            }
        };

        checkTranslation();
    });
}

function translateContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const translationKey = element.getAttribute('data-i18n').trim();
        const isMetaTag = element.tagName.toLowerCase() === 'meta';

        let translation;
        if (isMetaTag) {
            translation = translateMetaTagContent(translationKey);
        } else {
            if (i18next.language !== 'en') {
                translation = i18next.t(translationKey);
                const currentHTML = element.innerHTML.trim();
                const translatedHTML = translation.replace(/(?:\r\n|\r|\n)/g, '<br>');
                if (currentHTML !== translatedHTML) {
                    element.innerHTML = translatedHTML;
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    updateHreflang();

    // Attempt to find the "wf-form-Contact-form" element by ID
    const contactForm = document.getElementById("wf-form-Contact-form");

    // Check if the "wf-form-Contact-form" element exists
    if (contactForm) {
        // If it exists, attach the onsubmit handler
        contactForm.onsubmit = submitForm;
    } else {
        // If it doesn't exist, you can handle it here (e.g., log a message)
        console.log("Form element with ID 'wf-form-Contact-form' not found.");
    }

    // Attempt to find the "wf-form-Rolex-Contact-form" element by ID
    const rolexContactForm = document.getElementById("wf-form-Rolex-Contact-form");

    // Check if the "wf-form-Rolex-Contact-form" element exists
    if (rolexContactForm) {
        // If it exists, attach the onsubmit handler
        rolexContactForm.onsubmit = submitFormRolexContact;
    } else {
        // If it doesn't exist, you can handle it here (e.g., log a message)
        console.log("Form element with ID 'wf-form-Rolex-Contact-form' not found.");
    }

    // Attempt to find the "wf-form-Rolex-Contact-form" element by ID
    const rolexProductsForm = document.getElementById("wf-form-Rolex-product-contact-form");

    // Check if the "wf-form-Rolex-Contact-form" element exists
    if (rolexProductsForm) {
        // If it exists, attach the onsubmit handler
        rolexProductsForm.onsubmit = submitFormRolexProducts;
    } else {
        // If it doesn't exist, you can handle it here (e.g., log a message)
        console.log("Form element with ID 'wf-form-Rolex-product-contact-form' not found.");
    }

    // Attempt to find the "wf-form-Rolex-Contact-form" element by ID
    const jewelryProductsForm = document.getElementById("wf-form-Jewellery-contact-form");

    // Check if the "wf-form-Rolex-Contact-form" element exists
    if (jewelryProductsForm) {
        // If it exists, attach the onsubmit handler
        jewelryProductsForm.onsubmit = submitFormJewelryProducts;
    } else {
        // If it doesn't exist, you can handle it here (e.g., log a message)
        console.log("Form element with ID 'wf-form-Jewellery-contact-form' not found.");
    }

    // Attempt to find the "wf-form-Rolex-Contact-form" element by ID
    const tudorProductsForm = document.getElementById("wf-form-Tudor-product-contact-form");

    // Check if the "wf-form-Rolex-Contact-form" element exists
    if (tudorProductsForm) {
        // If it exists, attach the onsubmit handler
        tudorProductsForm.onsubmit = submitFormTudorProducts;
    } else {
        // If it doesn't exist, you can handle it here (e.g., log a message)
        console.log("Form element with ID 'wf-form-Tudor-product-contact-form' not found.");
    }

    // Attempt to find the "wf-form-Rolex-Contact-form" element by ID
    const swissKubikProductsForm = document.getElementById("wf-form-Swiss-Kubik-contact-form");

    // Check if the "wf-form-Rolex-Contact-form" element exists
    if (swissKubikProductsForm) {
        // If it exists, attach the onsubmit handler
        swissKubikProductsForm.onsubmit = submitFormSwissKubik;
    } else {
        // If it doesn't exist, you can handle it here (e.g., log a message)
        console.log("Form element with ID 'wf-form-Swiss-Kubik-contact-form' not found.");
    }


    setInterval(function () {
        document.querySelectorAll("[data-limit]").forEach(function (e) {
            var t = parseInt(e.getAttribute("data-limit")), n = e.children;
            n.length > t && Array.from(n).slice(t).forEach(function (e) {
                e.remove()
            })
        })
    }, 500);

    const nextBtns = document.querySelectorAll('.w-pagination-next');

    nextBtns.forEach(nextBtn => {
        nextBtn.addEventListener('click', () => {
            setTimeout(() => {
                rewriteRelativeURLs();
                generateI18nTags().then(() => {
                    translateContent();
                });
            }, 1);
        });
    });


    // Find all forms by their action attribute
    const searchForms = document.querySelectorAll('form[action="/search"]');
    console.log('Search forms:', searchForms); // Debugging
    // Loop through each form and add event listeners
    searchForms.forEach((searchForm) => {
        // Event listener for form submission for each search form
        searchForm.addEventListener('submit', function (event) {
            handleFormSubmission(event, searchForm);
        });

        // Event listener for keypress event (Enter key) for each search form
        searchForm.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent the default behavior of Enter key
                const submitEvent = new Event('submit', {bubbles: true});
                searchForm.dispatchEvent(submitEvent); // Dispatch the submit event on the form
            }
        });
    });

    waitForElm('.CookieDeclaration').then((elm) => {
        document.getElementsByClassName('CookieDeclaration')[0].style.display = 'none';
    });

    Promise.all([rewriteRelativeURLs(), generateI18nTags(), fetchPromise])
        .then(() => {
            i18next.addResourceBundle('en', 'translation', translationData.en, true, true);
            i18next.addResourceBundle('hu', 'translation', translationData.hu, true, true);
            i18next.addResourceBundle('sr', 'translation', translationData.sr, true, true);
            i18next.addResourceBundle('me', 'translation', translationData.me, true, true);

            translateContent();
            handleLanguage();
            const targetNode = document.getElementById('products-container');
        })
        .then(() => {
            return fetchAndModifyProducts();
        })
        .then(() => {
            const url = window.location.href;
            const baseUrl = url.split('?')[0];
            if (baseUrl.endsWith("/rolex/watches")) {
                initFilters();
            } else if (baseUrl.match(/\/rolex\/watches\/[^\/?]+(\?.*)?$/)) {
                initFilters();
            } else {
                return Promise.resolve();
            }
        })
        .catch(error => {
            console.error('Error loading translations:', error);
        });

});

function getLangFromURL() {
    const parts = window.location.pathname.split('/');
    if (parts.length >= 2 && parts[1].includes('-')) {
        return parts[1].split('-')[1]; // e.g., 'en'
    }
    return 'en'; // fallback
}

function getRegFromURL() {
    const parts = window.location.pathname.split('/');
    if (parts.length >= 2 && parts[1].includes('-')) {
        return parts[1].split('-')[0]; // e.g., 'rs'
    }
    return 'rs'; // fallback
}


setTimeout(() => {
    var rdp = new RolexRetailerClock();
    var rdpConfig = {
        dealerAPIKey: 'e2189e9a1f4814911bceb20bbac82bdc',
        lang: 'en_GB',
        colour: 'gold'
    }
    var currentUrl = window.location.href;
    if (currentUrl.includes("rs-sr") || currentUrl.includes("me-me")) {
        rdpConfig.lang = 'sr';
    } else if (currentUrl.includes("eu-hu")) {
        rdpConfig.lang = 'hu';
    }
    try {
        rdp.getRetailerClock(rdpConfig);
    } catch (err) {
    }
}, 10);


$('.search__close').on('click', function () {
    $('.search-icon').click();
});
$('.header__dropdown-close').on('click', function () {
    $(".w-dropdown").trigger("w-close")
});
$('.nav__dropdown-close-area').on('click', function () {
    $('.nav__dropdown-close').click();
});

function changeLanguage(language) {
    i18next.changeLanguage(language, (err, t) => {
        if (err) {
            console.error('Error changing language:', err);
            return;
        }
        translateContent();
    });
}

function handleLanguage() {
    regionLanguage = document.getElementById('region-language');
    // const regValue = localStorage.getItem('reg');
    // const langValue = localStorage.getItem('lang');
    const langValue = getLangFromURL();
    const regValue = getRegFromURL();
    document.documentElement.lang = langValue;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
        const newHref = canonicalLink.href.replace('/rs-en/', `/${regValue}-${langValue}/`);
        canonicalLink.href = newHref;
    }

    regionLanguage = document.getElementById('region-language');
    regionLanguageMobile = document.getElementById('region-language-m');
    var tpEl = document.getElementById('menu-timepieces');
    var tpElM = document.getElementById('timepieces-m');
    var jewelleryElement = document.getElementById('menu-jewellery');
    var jewelleryElementMobile = document.getElementById('jewellery-m');
    var fTudor = document.getElementById('fTudor');
    var fSwiss = document.getElementById('fSwiss');
    var fMessika = document.getElementById('fMessika');
    var fRc = document.getElementById('fRc');
    var fPd = document.getElementById('fPd');
    var geoEuHu = document.getElementById('geo-eu-hu');
    var geoEuEn = document.getElementById('geo-eu-en');
    var geoRsEn = document.getElementById('geo-rs-en');
    var geoMeEn = document.getElementById('geo-me-en');
    var geoIntEn = document.getElementById('geo-int-en');
    var mMenuCrown = document.getElementById('m-menu-crown');
    var menuCrown = document.getElementById('menu-crown');
    var fCrown = document.getElementById('f-crown');
    var sectionLadies = document.getElementById('section-ladies');
    var sectionGentleman = document.getElementById('section-gentlemen');
    var sectionLatestNews = document.getElementById('section-latest');
    var sectionLatestNewsRolexHU = document.getElementById('section-latest-rolex');
    var sectionLatestNewsRolexME = document.getElementById('section-latest-rolex-me');
    var menuCareers = document.getElementById('menu-careers');
    var currentUrl = window.location.href;
    var socialIg = document.getElementById('social-ig');

    if (currentUrl.includes('/eu-hu/')) {
        regionLanguage.innerHTML = ' Magyarország és az EU országai | HU';
        regionLanguageMobile.innerHTML = ' Magyarország és az EU országai | HU';
        tpEl.style.display = 'none';
        tpElM.style.display = 'none';
        jewelleryElement.style.display = 'none';
        jewelleryElementMobile.style.display = 'none';
        socialIg.href = "https://www.instagram.com/petitegeneve_budapest";
        if (sectionLadies != null || sectionLadies != undefined) {
            sectionLadies.style.display = 'none';
        }
        ;
        if (sectionGentleman != null || sectionLadies != undefined) {
            sectionGentleman.style.display = 'none';
        }
        ;
        if (sectionLatestNews != null || sectionLatestNews != undefined) {
            sectionLatestNews.style.display = 'none';
        }
        ;
        if (sectionLatestNewsRolexHU != null || sectionLatestNewsRolexHU != undefined) {
            sectionLatestNewsRolexHU.style.display = 'block';
        }
        ;
        fTudor.style.display = 'none';
        fSwiss.style.display = 'none';
        fMessika.style.display = 'none';
        fRc.style.display = 'none';
        fPd.style.display = 'none';
        geoEuHu.classList.add("current");
        mMenuCrown.style.display = 'none';
        menuCrown.style.display = 'none';
    }
    if (currentUrl.includes('/rs-en/')) {
        regionLanguage.innerHTML = ' Serbia | EN';
    }
    if (currentUrl.includes('/rs-sr/')) {
        regionLanguage.innerHTML = ' Serbia | SR';
    }
    if (currentUrl.includes('/eu-en/')) {
        regionLanguage.innerHTML = ' Hungary and EU countries | EN';
        regionLanguageMobile.innerHTML = ' Hungary and EU countries | EN';
        tpEl.style.display = 'none';
        tpElM.style.display = 'none';
        jewelleryElement.style.display = 'none';
        jewelleryElementMobile.style.display = 'none';
        socialIg.href = "https://www.instagram.com/petitegeneve_budapest";
        if (sectionLadies != null || sectionLadies != undefined) {
            sectionLadies.style.display = 'none';
        }
        ;
        if (sectionGentleman != null || sectionLadies != undefined) {
            sectionGentleman.style.display = 'none';
        }
        ;
        if (sectionLatestNews != null || sectionLatestNews != undefined) {
            sectionLatestNews.style.display = 'none';
        }
        ;
        if (sectionLatestNewsRolexHU != null || sectionLatestNewsRolexHU != undefined) {
            sectionLatestNewsRolexHU.style.display = 'block';
        }
        ;
        fTudor.style.display = 'none';
        fSwiss.style.display = 'none';
        fMessika.style.display = 'none';
        fRc.style.display = 'none';
        fPd.style.display = 'none';
        geoEuEn.classList.add("current");
        mMenuCrown.style.display = 'none';
        menuCrown.style.display = 'none';
        fCrown.style.display = 'none';
    }
    if (currentUrl.includes('/me-en/') || currentUrl.includes('/me-me/')) {
        regionLanguage.innerHTML = ' Montenegro | EN';
        regionLanguageMobile.innerHTML = ' Montenegro | EN';
        tpEl.style.display = 'none';
        tpElM.style.display = 'none';
        jewelleryElement.style.display = 'none';
        jewelleryElementMobile.style.display = 'none';
        socialIg.href = "https://www.instagram.com/petitegeneve_portomontenegro";
        if (sectionLadies != null || sectionLadies != undefined) {
            sectionLadies.style.display = 'none';
        }
        ;
        if (sectionGentleman != null || sectionLadies != undefined) {
            sectionGentleman.style.display = 'none';
        }
        ;
        if (sectionLatestNewsRolexME != null || sectionLatestNewsRolexME != undefined) {
            sectionLatestNews.style.display = 'none';
        }
        ;
        if (sectionLatestNewsRolexME != null || sectionLatestNewsRolexME != undefined) {
            sectionLatestNewsRolexME.style.display = 'block';
        }
        ;
        menuCareers.style.display = 'none';
        fTudor.style.display = 'none';
        fSwiss.style.display = 'none';
        fMessika.style.display = 'none';
        fRc.style.display = 'none';
        fPd.style.display = 'none';
        menuCareers.style.display = 'none';
    }
    if (currentUrl.includes('/me-me/')) {
        regionLanguage.innerHTML = ' Montenegro | ME';
    }
    if (currentUrl.includes('/ww-en/')) {
        regionLanguage.innerHTML = ' International | EN';
        regionLanguageMobile.innerHTML = ' International | EN';
        //menuCareers.style.display = 'none';
    }
}

window.addEventListener('DOMContentLoaded', function () {
    handleLanguage();
});


const priceElements = document.querySelectorAll(".price-text");
priceElements.forEach(priceElement => {
    const price = parseFloat(priceElement.textContent);
    const formattedPrice = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0, useGrouping: true}).format(price);
    const priceWithSeparator = formattedPrice.replace(/,/g, "'");
    priceElement.textContent = priceWithSeparator;
});


var didScroll;
var lastScrollTop = 0;
var delta = 1;
var navbarHeight = $('#navbar').outerHeight();
$(window).scroll(function (event) {
    didScroll = true;
});
setInterval(function () {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    if (Math.abs(lastScrollTop - st) <= delta)
        return;
    if (st > lastScrollTop && st > navbarHeight) {
        $('#navbar').removeClass('nav-down').addClass('nav-up');
        $('#rolex-nav').removeClass('rolex-nav--down').addClass('rolex-nav--up');
        $('#tudor-nav').removeClass('tudor-nav--down').addClass('tudor-nav--up');
        $('#swiss-nav').removeClass('swiss-nav--down').addClass('swiss-nav--up');
        $('#m-nav').removeClass('m-nav--down').addClass('m-nav--up');
        $('#rc-nav').removeClass('rc-nav--down').addClass('rc-nav--up');
        $('#p-nav').removeClass('p-nav--down').addClass('p-nav--up');
        $("#re-nav").removeClass("re-nav--down").addClass("re-nav--up");
    } else {
        if (st + $(window).height() < $(document).height()) {
            $('#navbar').removeClass('nav-up').addClass('nav-down');
            $('#rolex-nav').removeClass('rolex-nav--up').addClass('rolex-nav--down');
            $('#tudor-nav').removeClass('tudor-nav--up').addClass('tudor-nav--down');
            $('#swiss-nav').removeClass('swiss-nav--up').addClass('swiss-nav--down');
            $('#m-nav').removeClass('m-nav--up').addClass('m-nav--down');
            $('#rc-nav').removeClass('rc-nav--up').addClass('rc-nav--down');
            $('#p-nav').removeClass('p-nav--up').addClass('p-nav--down');
            $("#re-nav").removeClass("re-nav--up").addClass("re-nav--down");
        }
    }
    lastScrollTop = st;
}


function e(c) {
    const d = document.querySelector(`.${c}`);
    if (!d) return;
    d.addEventListener('wheel', e => (e.preventDefault(), d.scrollLeft += e.deltaY));
    d.addEventListener('touchmove', e => (e.preventDefault(), d.scrollLeft -= (e.changedTouches[0].clientX - d.t) , d.t = e.changedTouches[0].clientX));
    d.addEventListener('touchstart', e => d.t = e.touches[0].clientX);
}

e('header__link-list-track');


window.addEventListener('CookiebotOnAccept', function (e) {
    if (Cookiebot.consent.necessary) {
        document.cookie = 'rlx-consent=true; path=/';
        if (typeof _satellite !== 'undefined') {
            _satellite.setVar("Analyticsconsent", "true");
        }
    }
}, false);

window.addEventListener('CookiebotOnDecline', function (e) {
    if (Cookiebot.consent.necessary) {
        document.cookie = 'rlx-consent=false; path=/';
        if (typeof _satellite !== 'undefined') {
            _satellite.setVar("Analyticsconsent", "false");
        }
    }
}, false);


(function () {
  // Debounce helper
  function debounce(fn, delay = 150) {
    let t; 
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
  }

  // Skrivanje cena (.price) unutar .search-result
  function hidePrices(root = document) {
    const nodes = root.querySelectorAll('.search-result .price');
    if (!nodes || nodes.length === 0) return false;
    nodes.forEach(n => {
      n.style.setProperty('display', 'none', 'important');
      n.style.setProperty('visibility', 'hidden', 'important');
      // (opciono) n.style.setProperty('opacity', '0', 'important');
    });
    return true;
  }

  // Veži event listenere na Algolia input polje (ili više njih)
  function bindSearchInputHandlers(root = document) {
    const inputs = root.querySelectorAll('.ais-SearchBox-input');
    if (!inputs.length) return;

    const rehide = debounce(() => {
      // rezultati se često re-renderuju sa zakašnjenjem, pa uradimo par pokušaja
      hidePrices();
      setTimeout(hidePrices, 50);
      setTimeout(hidePrices, 150);
    }, 120);

    inputs.forEach(inp => {
      // pokrivamo većinu slučajeva unosa
      inp.addEventListener('input', rehide, { passive: true });
      inp.addEventListener('change', rehide, { passive: true });
      inp.addEventListener('compositionend', rehide, { passive: true });
      inp.addEventListener('keyup', rehide, { passive: true });
    });
  }

  // MutationObserver: kada Algolia (ili app) ubaci nove rezultate ili input
  const observer = new MutationObserver(mutations => {
    let shouldRehide = false, shouldRebindInput = false;

    for (const m of mutations) {
      if (!m.addedNodes) continue;
      m.addedNodes.forEach(node => {
        if (!(node instanceof Element)) return;

        // Ako se dodaju novi rezultati, sakrij cene u njima
        if (node.matches('.search-result, .search-result *')) {
          hidePrices(node);
          shouldRehide = true;
        }

        // Ako se pojavi/ponovo renderuje input, veži handlere
        if (node.matches('.ais-SearchBox-input, .ais-SearchBox-input *') || node.querySelector?.('.ais-SearchBox-input')) {
          shouldRebindInput = true;
        }
      });
    }

    if (shouldRebindInput) bindSearchInputHandlers(document);
    if (shouldRehide) {
      // još par “retry” poziva, jer UI često renderuje u talasima
      setTimeout(hidePrices, 30);
      setTimeout(hidePrices, 120);
    }
  });

  function init() {
    hidePrices();                 // inicijalno sakrij
    bindSearchInputHandlers();    // veži na input polje
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();



