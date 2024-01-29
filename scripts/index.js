function initializePage() {
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
 * @param  {Function} error       Callback on failure
 */

async function getURL(url, findElem, error ) {
	// Feature detection
	if ( !window.XMLHttpRequest ) return;
	// Create new request
	var request = new XMLHttpRequest();

    let promise = new Promise(
        function (resolve, reject) {
            // Setup callbacks
            request.onreadystatechange = function () {
                // If the request is complete
                if ( request.readyState === 4 ) {
                    // If the request failed
                    if ( request.status !== 200 ) {
                        if ( error && typeof error === 'function' ) {
                            error( request.responseText, request );
                        }
                        reject(request.responseText);
                    }
                    // If the request succeeded
                    resolve(request.responseText)
                }
            };

            // Get the HTML
            request.open( 'GET', url );
            request.send();
        }
    )
    
    var embed = document.querySelector(findElem);
    if (!embed) return;
    embed.outerHTML = await promise;
	
};