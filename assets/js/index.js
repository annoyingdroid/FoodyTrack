// declare variables
// var qParam = document.querySelector('#qParameter');
var dataDisplayContainer = $("#dataDisplay");
var foodEmojis = [];

$(document).ready(function () {
    $('select').formSelect();
});

//Dynamically sets favicon to random food emoji
getEmojis();
function getEmojis() {
    var emojiURL = "https://emoji-api.com/categories/food-drink?access_key=4a22fc6b1e718d109490e5152618ae71ee948623";
    fetch(emojiURL).then(
        response => { return response.json(); })
        .then(data => {
            for ([index, obj] of data.entries()) {
                foodEmojis.push(obj.character);
            }
            var index = Math.round(Math.random() * 257) - 1;
            $('#favicon').attr("href", "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>" + foodEmojis[index] + "</text></svg>");
            $('#navTitle').text(foodEmojis[index] + "FoodyTrack™");

        })
}

//Loads favorites list on page load
loadFaves();
function loadFaves() {
    var keys = Object.keys(localStorage);
    $("#favesList").html("");
    for (var k = 0; k < keys.length; k++) {
        $("#favesList").append(`
        <li>
            <a type="button" class="btn btn-light d-inline" href="`+ localStorage.getItem(keys[k]) + `" target="_blank">` + keys[k] + `</a>
        </li>
    `);
    }
};

// declare get recipes function
function getRecipes(qParam, healthOptSel, dietOptSel, dietOptSel) {
    var apiUrl = "https://api.edamam.com/api/recipes/v2?type=public&app_id=b08dc2fb&app_key=783268a2de0b8c46cf30721531506847&q=" + qParam;

    // make request to the url
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (recipeData) {
                if (recipeData.hits.length > 0) {
                    displayRecipes(recipeData);
                    console.log(response);
                } else {
                    console.log("BROKEN");
                    // TO DO: add modal alert that displays "problem getting recipes"
                    M.toast({ html: 'No recipes available! Please try another search.', classes: 'rounded green' });
                }
            })
        } else {
            console.log("BROKEN");
            // TO DO: add modal alert that displays "problem getting recipes"
            M.toast({ html: 'There was a problem getting your recipes.', classes: 'rounded green' });
        }
    });
};

// dynamically display recipe cards to page
function displayRecipes(recipeData) {
    var recipes = recipeData.hits
    for (var i = 0; i < recipes.length; i++) {
        var currentRecipe = recipes[i].recipe;
        //console.log(currentRecipe);
        if (recipes.length > 0) {
            $("#dataDisplay").append(`
            <div class="recipe-card card col s3">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src=`+ currentRecipe.image + `>
                </div>
                <div class="card-content">
                    <p>
                        <span class="card-title activator grey-text text-darken-4">
                            `+ currentRecipe.label + `
                            <i class="material-icons right">more_vert</i>
                        </span>
                        <a href="`+ currentRecipe.url + `" target="_blank" > Full Recipe Here </a>
                    </p>
                    <button class="btn-floating btn-small waves-effect waves-light green" onclick="faveRecipe('`+ currentRecipe.label + `','` + currentRecipe.url + `')">
                        <i class="material-icons">add</i>
                    </button>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">`+ currentRecipe.label + `</span>
                    <hr>
                    <span>Yield: ` + currentRecipe.yield + `</span>
                    <br>
                    <span>Calories: ` + Math.round(currentRecipe.calories) + `</span>
                </div>
            </div>
        `);
        };
    }
}


//Saves recipe in favorites and refreshes the faves list
function faveRecipe(recipeName, recipeLink) {
    localStorage.setItem(recipeName, recipeLink);
    loadFaves();
}

var formSubmitHandler = function () {
    var qParam = $('#qParameter').val();
    var healthOptSel = String($("#healthSelect").val() || []);
    console.log(healthOptSel);
    var dietOptSel = String($("#dietSelect").val() || []);
    console.log(dietOptSel);
    var dishOptSel = String($("#dishSelect").val() || []);
    console.log(dishOptSel);
    getRecipes(qParam, healthOptSel, dietOptSel, dietOptSel);

}

// Search Button Eventlistener
$("#searchBtn").on('click', function (event) {
    $("#dataDisplay").html("");
    formSubmitHandler();
});

