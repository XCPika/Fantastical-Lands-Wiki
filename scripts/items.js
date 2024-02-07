import { createElementWithClass, createElementWithInnerHTML } from './utils.js'

async function initializeItems(url) {

    await fetch(url)
    .then(data => {
        data.json().then(
            data => {
                let itemMaps = generateItemMap(data)

                Object.keys(itemMaps).forEach(key => {
                    let item = data[key]
                    let map = itemMaps[key]
                })

                console.log(itemMaps)
            }
        )
    })

}


function generateItemMap(data) {
    var itemMap = {}
    Object.keys(data).forEach(item => {
        let _item = data[item]
        var recipe = {}
        _item.recipe.forEach((v, i) => {
            if (Object.hasOwn(recipe, v)) return
            recipe[v] = _item.items[Object.keys(recipe).length]
        })
        itemMap[item] = recipe
    });
    return itemMap
}


export default initializeItems;
