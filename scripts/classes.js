var data;
$(document).ready(function(){
    $.getJSON('./assets/data/classes/index.json', function(json) { data = json; initializeClasses();});
});

initializePage = (function(_super) {
    return function() {
        return _super.apply(this, arguments);
    }
})(initializePage);


function initializeClasses() {
    var current_class = self.location.search.substring(1);
    var class_data;
    if (current_class != "") {
        const current_class_element = $("#current_class");
        class_data = data[current_class];
        current_class_element.children(".class-banner-title").text(class_data.name);
        current_class_element.children(".class-banner-icon").css("background-image", `url(./assets/img/icons/${current_class}.png)`);
        current_class_element.append($("<div/>").addClass(`class-banner-impact impact-${class_data.impact}`));
        const class_details_element = $("#class-details").children(".main-class-details");
        class_details_element
            .append($("<h2/>").text("Description:"))
            .append($("<p/>").text(class_data.description))
            .append($("<h2/>").text("Powers:"))
            .append($("<p/>").text(`Activation Key: ${class_data.key}`));
        var power_data;
        for (const key in class_data.powers) {
            if (Object.hasOwnProperty.call(class_data.powers, key)) {
                power_data = class_data.powers[key];
                class_details_element
                    .append($("<h3/>").text(`${key}`))
                    .append($("<p/>").text(`${power_data.description}`))
                    .append($("<p/>").text(`Active Ability: ${power_data.active}`))
                if (power_data.active) {
                    class_details_element
                        .append($("<p/>").text(`Cooldown: ${power_data.cooldown}`))
                };
            }
        }
    }
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            class_data = data[key];
            $("#class-view").append(
                $("<div/>")
                .attr("role", "button")
                .click(searchClass)
                .attr("id", key.toLowerCase())
                .addClass("class-banner pixelated")             
                .append($("<div/>").addClass("class-banner-icon pixelated").css("background-image", `url(./assets/img/icons/${key}.png)`))
                .append($("<p/>").html(class_data.name).addClass("class-banner-title"))
                .append($("<div/>").addClass(`class-banner-impact impact-${class_data.impact}`))
            )
        }
    };
};

function searchClass(event) { self.location = `${self.location.protocol}//${self.location.host}${self.location.pathname}?${event.currentTarget.id}` };

$("body").append(function(){
    
});