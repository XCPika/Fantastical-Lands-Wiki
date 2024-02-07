function createElementWithClass(tag, cls) {
    if (typeof(cls) == "string") {
        cls = [cls]
    }
    var elem = document.createElement(tag);
    elem.classList.add(...cls);
    return elem
}

function createElementWithInnerHTML(tag, inner) {
    var elem = document.createElement(tag);
    elem.innerHTML = inner;
    return elem
}

export { createElementWithClass, createElementWithInnerHTML }