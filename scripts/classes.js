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
    const current_class_element = $("#current_class")
    current_class_element.children(".class-banner-title").text(current_class.charAt(0).toUpperCase() + current_class.slice(1));
    current_class_element.children(".class-banner-icon").css("background-image", `url(../assets/img/icons/${current_class}.png)`);
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const class_data = data[key];
            $("#class-view").append(
                $("<div/>")
                .attr("role", "button")
                .click(searchClass)
                .attr("id", key.toLowerCase())
                .addClass("class-banner pixelated")             
                .append($("<div/>").addClass("class-banner-icon pixelated").css("background-image", `url(../assets/img/icons/${key}.png)`))
                .append($("<p/>").html(class_data.name).addClass("class-banner-title"))
                .append($("<div/>").addClass("class-banner-impact-blank"))
                .append($("<div/>").addClass("class-banner-impact-blank"))
                .append($("<div/>").addClass("class-banner-impact-blank"))
            )
        }
    };
};

function searchClass(event) { self.location = `${self.location.protocol}//${self.location.host}${self.location.pathname}?${event.currentTarget.id}` };

$("body").append(function(){
    
});