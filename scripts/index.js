function initializeStorage() {
    if (typeof(Storage) !== "undefined") {
        var storage = window.localStorage;
        if (storage.getItem("dark") == null) {
            storage.setItem("dark", "true");
        }
        console.log("running")
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
    console.log(mode ? "": "dark-mode")
    var element = document.body;
    var dark_mode_button = document.getElementById("dark-mode-toggle");
    element.className = mode ? "dark-mode": "";
    dark_mode_button.src = mode ? "./assets/img/page/dark_mode/dark-mode.png" : "./assets/img/page/dark_mode/light-mode.png";
}