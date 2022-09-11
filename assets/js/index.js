// declare variables
var qParam = document.querySelector('#qParameter');
var dataDisplayContainer = $("#dataDisplay");
var foodEmojis = [];
var dietOptions = ['Balanced', 'High Fiber', 'Hight Protein', 'Low Carb', 'Low Fat', 'Low Sodium'];
var healthOptions = ['Alcohol Cocktails', 'Alcohol Free', 'Alcohol Free','Egg Free', 'Egg Free', 'Egg Free', 'Immunity Supporting', 'Kosher', 'Low Sugar', 'No Oil Added', 'Paleo', 'Peanut Free', 'Pescatarian', 'Pork Free', 'Red Meat Free', 'Sesame Free', 'Shellfish Free', 'Soy Free', 'Sugar Conscious', 'Sulfite Free', 'Tree Nut Free', 'Vegan', 'Vegetarian', 'Wheat Free'];
var dishType = ['None','Biscuits and Cookies', 'Bread', 'Cereals', 'Condiments and Sauces', 'Desserts', 'Main Course', 'Pancake', 'Preps', 'Preserve', 'Salad', 'Sandwiches', 'Side Dish', 'Soup', 'Starter', 'Sweets'];


$(document).ready(function () {
    $('select').formSelect();
});

//Dynamically sets favicon to random food emoji
getEmojis();
function getEmojis(){
    var emojiURL = "https://emoji-api.com/categories/food-drink?access_key=4a22fc6b1e718d109490e5152618ae71ee948623";
    fetch(emojiURL).then(
        response => {return response.json();})
    .then(data => {
        for([index, obj] of data.entries()){
            foodEmojis.push(obj.character);
        }
        var index = Math.round(Math.random() * 257) - 1;
        $('#favicon').attr("href","data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>"+ foodEmojis[index] +"</text></svg>");
        $('#navTitle').text(foodEmojis[index] + "FoodyTrack™");

    })
}

//Loads favorites list on page load
loadFaves();
function loadFaves(){
    var keys = Object.keys(localStorage);
    $("#favesList").html("");
    for(var k=0; k<keys.length; k++){
        $("#favesList").append(`
        <li>
            <a type="button" class="btn btn-light d-inline" href="`+ localStorage.getItem(keys[k]) +`" target="_blank">`+ keys[k] +`</a>
        </li>
    `);
    }
};

loadFilters();
function loadFilters() {
    for(obj of dietOptions){
        $('#dietSelect').append("<option value="+ obj.toLowerCase().replace(/\s/g , "-") +">"+ obj + "</option>");
    }

    for(obj of healthOptions){
        $('#healthSelect').append("<option value="+ obj.toLowerCase().replace(/\s/g , "-") +">"+ obj + "</option>");
    }

    for(obj of dishType){
        $('#dishSelect').append("<option value="+ obj.toLowerCase().replace(/\s/g , "-") +">"+ obj + "</option>");
    }
}

// declare get recipes function
function getRecipes(qParam){
    var apiUrl = "https://api.edamam.com/api/recipes/v2?type=public&app_id=b08dc2fb&app_key=783268a2de0b8c46cf30721531506847&q=" + qParam;

    // make request to the url
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (recipeData) {
                displayRecipes(recipeData);
                console.log(response);
            })
        } else{ 
            // TO DO: add modal alert that displays "problem getting recipes"
            M.toast({html: 'No recipes available! Please try another search', classes: 'rounded green'});
        }
    });
};

// dynamically display recipe cards to page
function displayRecipes(recipeData){
    var recipes = recipeData.hits
    for (var i = 0; i < recipes.length; i++) {
        var currentRecipe = recipes[i].recipe;
        //console.log(currentRecipe);

        $("#dataDisplay").append(`
            <div class="recipe-card card col s3">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src=`+ currentRecipe.image +`>
                </div>
                <div class="card-content">
                    <p>
                        <span class="card-title activator grey-text text-darken-4">
                            `+ currentRecipe.label +`
                            <i class="material-icons right">more_vert</i>
                        </span>
                        <a href="`+ currentRecipe.url + `" target="_blank" > Full Recipe Here </a>
                    </p>
                    <button class="btn-floating btn-small waves-effect waves-light green" onclick="faveRecipe('`+ currentRecipe.label +`','`+ currentRecipe.url +`')">
                        <i class="material-icons">add</i>
                    </button>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">`+ currentRecipe.label +`</span>
                    <hr>
                    <span>Yield: ` + currentRecipe.yield + `</span>
                    <br>
                    <span>Calories: ` + Math.round(currentRecipe.calories) + `</span>
                </div>
            </div>
        `);

        // // NOTE: These steps create a Materialize card called "Card Reveal"
        // // 1a. create card for current recipe and set classes
        // var cardContainer = $("<div>");
        // cardContainer.addClass("recipe-card card col s3");
        // cardContainer.attr("id", "cardContainer");

        // // 1b. create card-image div and set classes
        // var cardImageEl = $("<div>");
        // cardImageEl.addClass("card-image waves-effect waves-block waves-light");

        // // 1c. create image el, set class, set src
        // var recipeImageEl = $("<img>");
        // recipeImageEl.addClass("activator").attr("src", currentRecipe.image);

        // // 1d. append image el to card image div
        // cardImageEl.append(recipeImageEl);

        // // 1e. append card image element to card container
        // cardContainer.append(cardImageEl);


        // // 2a. create card content div and set class (unrevealed title)
        // var cardContentEl = $("<div>");
        // cardContentEl.addClass("card-content");

        // // 2b. create span element for card title (contains title)
        // var cardTitleEl = $("<span>").text(currentRecipe.label);
        // cardTitleEl.addClass("card-title activator grey-text text-darken-4");

        // // 2c. create <i> element for card title
        // var iEl = $("<i>").text("more_vert");
        // iEl.addClass("material-icons right");

        // // 2d. append iEl to cardTitleEl
        // cardTitleEl.append(iEl);

        // // 2e. append cardTitleEL to cardContentEl
        // cardContentEl.append(cardTitleEl);

        // // 2f. create <p> element for full recipe link
        // var recipeLinkEl = $("<p>");

        // // 2g. create <a> element that contains href
        // var recipeLink = $("<a>").text("Full Recipe Here");
        // recipeLink.attr({
        //     href: currentRecipe.url,
        //     target: "_blank"
        // });

        // // 2h. append recipeLink to recipeLinkEl
        // recipeLinkEl.append(recipeLink);

        // // 2i. append recipeLinkEl to cardContentEl
        // cardContentEl.append(recipeLinkEl);

        // // 2j. append cardContentEl to cardContainer
        // cardContainer.append(cardContentEl);

        // // 2k. create button to favorite recipe
        // var favRecipe = $('<a>').addClass("btn-floating btn-small waves-effect waves-light green");
        // var favRecipeI = $('<i>').addClass("material-icons").text("add");
        // favRecipe.append(favRecipeI);
        // favRecipe.attr('data-number', [i]);
        // console.log(i);
        // favRecipe.attr("id", "favButton");
        // // favRecipe.addClass(function (recipes){
            

        //     // var cardNumber = [i] + 1;
        //     // console.log(cardNumber);
        //     // favRecipe.addClass(cardNumber);
        //     // console.log(favRecipe.class);
                
        // // })

        // // 2l. append favRecipe to cardContent El
        // cardContentEl.append(favRecipe); 

        // // // 2m. add event listener to add to favorites list
        // // $("#favButton").click(addToFavorites(currentRecipe));

        // // 3Aa. create card reveal div and set classes
        // var cardRevealEl = $("<div>");
        // cardRevealEl.addClass("card-reveal");

        // // 3Ab. create <span> for revealed title
        // var revealedTitle = $("<span>").text(currentRecipe.label);
        // revealedTitle.addClass("card-title grey-text text-darken-4");

        // // 3Ac. create <i> element for revealed title
        // var revealedIEl = $("<i>");
        // revealedIEl.addClass("material-icons right");

        // // 3Ad. append revealedIEl to revealedTitle
        // revealedTitle.append(revealedIEl);

        // // 3Af. append revealedTitle to cardRevealEl
        // cardRevealEl.append(revealedTitle);
        // cardRevealEl.append($("<hr/>"));

        // //3Ag. append cardRevealEl to cardContainer
        // cardContainer.append(cardRevealEl);

        // // 3Ba. create yield <p> el
        // var servingsEl = $("<span>").text("Yield: " + currentRecipe.yield);
        // // 3Bb. create break el
        // var breakEl = $("<br/>");

        // // 3Bc. create calories <p> el
        // var caloriesEl = $("<span>").text("Calories: " + Math.round(currentRecipe.calories));


        // // TEMPORARY APPEND FOR TESTING
        // cardRevealEl.append(servingsEl);
        // cardRevealEl.append(breakEl);
        // cardRevealEl.append(caloriesEl);


        // // append card reveal to card container
        // cardContainer.append(cardRevealEl);

        // // append card container to data display
        // dataDisplayContainer.append(cardContainer);
    }
}

//  2m. add event listener to add to favorites lgitist

//Saves recipe in favorites and refreshes the faves list
function faveRecipe(recipeName, recipeLink){
    localStorage.setItem(recipeName, recipeLink);
    loadFaves();
}

//Search Button Eventlistener
$("#searchBtn").on('click', function(event){
    $("#dataDisplay").html("");
    getRecipes($("#qParameter").val());
});

