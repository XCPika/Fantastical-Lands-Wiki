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

async function initializeOrigins(url) {
    await fetch(url)
    .then(data => {
        data.json().then(
            origin_data => {
                var current_origin = self.location.search.substring(1);
                var current_origin_data = origin_data[current_origin]
                if (current_origin != "") {
                    const current_origin_element = document.querySelector("#current_origin");
                    current_origin_element.querySelector(".origin-banner-title").innerHTML = current_origin_data.name;
                    current_origin_element.querySelector(".origin-banner-icon").style.backgroundImage = `url(./assets/img/icons/${current_origin}.webp)`;
                    current_origin_element.appendChild(createElementWithClass("div", ["origin-banner-impact", `impact-${current_origin_data.impact}`]));
                    const origin_details_element = document.querySelector("#origin-details .main-origin-details");
                    origin_details_element.appendChild(
                        createElementWithInnerHTML("h2", "Description:")
                    )
                    origin_details_element.appendChild(
                        createElementWithInnerHTML("p", current_origin_data.description)
                    )
                    origin_details_element.appendChild(
                        createElementWithInnerHTML("h2", "Powers:")
                    )
                    
                    var power_data;
                    for (const key in current_origin_data.powers) {
                        if (Object.hasOwnProperty.call(current_origin_data.powers, key)) {
                            power_data = current_origin_data.powers[key];
                            origin_details_element.appendChild(
                                createElementWithInnerHTML("h3", `${key}`)
                            )
                            origin_details_element.appendChild(
                                createElementWithInnerHTML("p", `${power_data.description}`)
                            )
                            origin_details_element.appendChild(
                                createElementWithInnerHTML("p", `Ability Type: ${power_data.active ? "Active" : "Passive"}`)
                            )
                            if (power_data.active) {
                                origin_details_element.appendChild(
                                    createElementWithInnerHTML("p", `Activation Key: ${current_origin_data.key}`)
                                )
                            }
                            if (power_data.active) {
                                origin_details_element.appendChild(                    
                                    createElementWithInnerHTML("p", `Cooldown: ${power_data.cooldown}`)
                                )
                            };
                        }
                    }
                }
                var origin_banner;
                var origin_banner_icon;
                var origin_banner_title;
                let origin_view = document.getElementById("origin-view")
                for (const key in origin_data) {
                    if (Object.hasOwnProperty.call(origin_data, key)) {
                        current_origin_data = origin_data[key];
                        origin_banner = createElementWithClass("div", "origin-banner")
                        origin_banner.setAttribute("aria-label", `${key.toLowerCase()} Origin button`);
                        origin_banner.id = key.toLowerCase();
                        origin_banner.role = "button"
                        origin_banner.addEventListener("click", searchOrigin);

                        origin_banner_icon = createElementWithClass("div", "origin-banner-icon")
                        origin_banner_icon.style.backgroundImage = `url(./assets/img/icons/${key}.webp)`;

                        origin_banner_title = createElementWithClass("p", "origin-banner-title")
                        origin_banner_title.innerHTML = current_origin_data.name;

                        origin_banner.append(
                            origin_banner_icon
                        )
                        origin_banner.append(
                            origin_banner_title
                        )
                        origin_banner.append(
                            createElementWithClass("div", ["origin-banner-impact", `impact-${current_origin_data.impact}`])
                        )
                        origin_view.append(
                            origin_banner
                        )
                    }
                };
            }
        )
       
    })
    
};

function searchOrigin(event) { 
    self.location = `${self.location.protocol}//${self.location.host}${self.location.pathname}?${event.currentTarget.id}` 
};
