async function initializePage() {
    initializeStorage();
}

function initializeStorage() {
    if (typeof(Storage) !== "undefined") {
        var storage = window.localStorage;
        if (storage.getItem("dark") == null) {
            storage.setItem("dark", "true");
        }
        setDarkMode(storage.getItem("dark") == "true" ? true : false);
    } else {
        setDarkMode(true);
    }
}

function darkModeToggle() {
    if (typeof(Storage) !== "undefined") {
        var storage = window.localStorage;
        var new_dark = storage.getItem("dark") == "true" ? false : true;
        storage.setItem("dark", new_dark.toString());
        setDarkMode(new_dark);
    } else {
        var element = document.body;
        element.classList.toggle("dark-mode");
        setDarkMode((element.className == "dark-mode"));
    }
}

function setDarkMode(mode) {
    document.body.className = mode ? "dark-mode": "";
    document.getElementById("dark-mode-toggle").src = mode ? "./assets/img/page/dark_mode/light-mode.png" : "./assets/img/page/dark_mode/dark-mode.png";
}


/**
 * MODIFIED VERSION OF getURL FROM: https://gomakethings.com/ditching-jquery/#get-html-from-another-page
 * 
 * Get HTML from another URL
 * @param  {String}   url         The URL
 * @param  {String}   findElem    Query selector of the element to replace
 * @param  {String}   deployDir   Extra routing that may be required by deployment
 */

async function getHTMLfromURL(url, findElem, deployDir) {
    let promise = new Promise(
        async function (resolve, reject) {
            // Setup callbacks
            var complete = url
            if (!(window.location.hostname == "127.0.0.1" || window.location.hostname == "localhost")) {
                if (deployDir != undefined) complete = `${deployDir}/${url}`
            }
            await fetch(complete)
                .then(data => resolve(data.text()))
                .catch(data => {
                    consle.log(data.error)
                    reject(data.error)
                });
        }
    )
    
    var embed = document.querySelector(findElem);
    if (!embed) return;
    embed.outerHTML = await promise;
};