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