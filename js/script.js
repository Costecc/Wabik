var slider = document.getElementById("myRange");
var output = document.getElementById("demo23");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
    console.log("Cokolwiek");
}

function getData() {
    var produkty = document.getElementById("produkty");
    produkty.innerHTML = "";

    wertical = 0;
    horizontal = 0;
    title = " 1";
    text = "111111";


    for (var i = 0; i < 20; i++) {
        var table_product = document.createElement("div"); table_product.className = "col-lg-4 col-md-6 mb-4";
        var card = document.createElement("div"); card.className = "card h-100";
        var card_body = document.createElement("div"); card_body.className = "card_body";
        var card_title = document.createElement("h4"); card_title.className = "card_title";
        var card_text = document.createElement("p"); card_text.className = "card_text";
        var card_footer = document.createElement("div"); card_footer.className = "card_footer";

        table_product.append(card);
        card.innerHTML = "<img class='card-img-top' src='http://placehold.it/700x400' alt>";
        card.append(card_body, card_footer);
        card_body.append(card_title, card_text);
        card_title.innerHTML = title;
        card_text.innerHTML = text;
        produkty.append(table_product);

    }
}