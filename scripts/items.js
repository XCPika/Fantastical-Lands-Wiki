import { createElementWithClass, createElementWithInnerHTML } from './utils.js'

function searchItem(event) { 
    self.location = `${self.location.protocol}//${self.location.host}${self.location.pathname}?${event.currentTarget.id}` 
};

async function initializeItems(url) {

    await fetch(url)
    .then(data => {
        data.json().then(
            data => {
                generateItemMap(data)
            }
        )
    })

}


function generateItemMap(data) {
    var itemMap = {}
    Object.keys(data).forEach(item => {
        // GENERATE RECIPE MAP FOR LATER USE
        let _item = data[item]
        var recipe = {}
        _item.recipe.forEach(v => {
            if (v === "") return
            if (Object.hasOwn(recipe, v)) return
            recipe[v] = _item.items[Object.keys(recipe).length]
        })

        itemMap[item] = recipe

        // GENERATE ITEM BUTTON LIST
        var item_banner;
        var item_banner_icon;
        let item_view = document.getElementById("item-view")
        item_banner = createElementWithClass("div", "item-banner")
        item_banner.setAttribute("aria-label", `${item.toLowerCase()} Item button`);
        item_banner.id = item.toLowerCase();
        item_banner.role = "button"
        item_banner.addEventListener("click", searchItem);

        item_banner_icon = createElementWithClass("div", "item-banner-icon")
        item_banner_icon.style.backgroundImage = `url(./assets/img/page/items/items/${item}.webp)`;

        item_banner.append(
            item_banner_icon
        )
        item_view.append(
            item_banner
        )

        
    });

    var current_item = self.location.search.substring(1);
    if (current_item != "") {
        var current_item_data = data[current_item]
        var current_recipe = itemMap[current_item]
        const current_item_element = document.querySelector("#item-crafting-view");
        Array.from(current_item_element.children).forEach((v, i) => {
            let current_recipe_item = current_item_data.recipe[i]
            var icon = current_recipe_item !== "" ? current_recipe[current_item_data.recipe[i]] : "blank"
            v.src = `./assets/img/page/items/items/${icon}.webp`
            v.alt = icon
        })
        const item_details_element = document.querySelector("#item-details");
        const item_details_heading = document.querySelector("#item-details h2");
        item_details_heading.innerHTML = current_item_data.name
        item_details_element.appendChild(
            createElementWithInnerHTML("p", current_item_data.description)
        )
        // item_details_element.appendChild(
        //     createElementWithInnerHTML("h2", "Powers:")
        // )
        
        // var power_data;
        // for (const key in current_item_data.powers) {
        //     if (Object.hasOwnProperty.call(current_item_data.powers, key)) {
        //         power_data = current_item_data.powers[key];
        //         item_details_element.appendChild(
        //             createElementWithInnerHTML("h3", `${key}`)
        //         )
        //         item_details_element.appendChild(
        //             createElementWithInnerHTML("p", `${power_data.description}`)
        //         )
        //         item_details_element.appendChild(
        //             createElementWithInnerHTML("p", `Ability Type: ${power_data.active ? "Active" : "Passive"}`)
        //         )
        //         if (power_data.active) {
        //             item_details_element.appendChild(
        //                 createElementWithInnerHTML("p", `Activation Key: ${current_item_data.key}`)
        //             )
        //         }
        //         if (power_data.active) {
        //             item_details_element.appendChild(                    
        //                 createElementWithInnerHTML("p", `Cooldown: ${power_data.cooldown}`)
        //             )
        //         };
        //     }
        // }
    }
}


export default initializeItems;
