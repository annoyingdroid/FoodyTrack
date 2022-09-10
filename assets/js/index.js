// declare variables
var recipeBtnSubmit = document.querySelector('.search-btn');
var qParam = document.querySelector('#qParameter');


$(document).ready(function () {
    $('select').formSelect();
});

var dataDisplayContainer = $("#dataDisplay");



// declare get recipes function
var getRecipes = function (qParam) {
    var apiUrl = "https://api.edamam.com/api/recipes/v2?type=public&app_id=b08dc2fb&app_key=783268a2de0b8c46cf30721531506847&q=" + qParam;

    // make request to the url
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (recipeData) {
                displayRecipes(recipeData);
            })
        } else { 
            // TO DO: add modal alert that displays "problem getting recipes"
            M.toast({html: 'Problem getting recipes!', classes: 'rounded'});
        }
    });
};

var addToFavorites = function (currentRecipe) {
    console.log(currentRecipe);
};

// dynamically display recipe cards to page
var displayRecipes = function (recipeData) {
    var recipes = recipeData.hits
    for (var i = 0; i < recipes.length; i++) {
        var currentRecipe = recipes[i].recipe;
        console.log(currentRecipe);

        // NOTE: These steps create a Materialize card called "Card Reveal"
        // 1a. create card for current recipe and set classes
        var cardContainer = $("<div>");
        cardContainer.addClass("recipe-card card col s3");
        cardContainer.attr("id", "cardContainer");

        // 1b. create card-image div and set classes
        var cardImageEl = $("<div>");
        cardImageEl.addClass("card-image waves-effect waves-block waves-light");

        // 1c. create image el, set class, set src
        var recipeImageEl = $("<img>");
        recipeImageEl.addClass("activator").attr("src", currentRecipe.image);

        // 1d. append image el to card image div
        cardImageEl.append(recipeImageEl);

        // 1e. append card image element to card container
        cardContainer.append(cardImageEl);


        // 2a. create card content div and set class (unrevealed title)
        var cardContentEl = $("<div>");
        cardContentEl.addClass("card-content");

        // 2b. create span element for card title (contains title)
        var cardTitleEl = $("<span>").text(currentRecipe.label);
        cardTitleEl.addClass("card-title activator grey-text text-darken-4");

        // 2c. create <i> element for card title
        var iEl = $("<i>").text("more_vert");
        iEl.addClass("material-icons right");

        // 2d. append iEl to cardTitleEl
        cardTitleEl.append(iEl);

        // 2e. append cardTitleEL to cardContentEl
        cardContentEl.append(cardTitleEl);

        // 2f. create <p> element for full recipe link
        var recipeLinkEl = $("<p>");

        // 2g. create <a> element that contains href
        var recipeLink = $("<a>").text("Full Recipe Here");
        recipeLink.attr({
            href: currentRecipe.url,
            target: "_blank"
        });

        // 2h. append recipeLink to recipeLinkEl
        recipeLinkEl.append(recipeLink);

        // 2i. append recipeLinkEl to cardContentEl
        cardContentEl.append(recipeLinkEl);

        // 2j. append cardContentEl to cardContainer
        cardContainer.append(cardContentEl);

        // 2k. create button to favorite recipe
        var favRecipe = $('<a>').addClass("btn-floating btn-small waves-effect waves-light green");
        var favRecipeI = $('<i>').addClass("material-icons").text("add");
        favRecipe.append(favRecipeI);
        favRecipe.attr('data-number', [i]);
        console.log(i);
        favRecipe.attr("id", "favButton");
        // favRecipe.addClass(function (recipes){
            

            // var cardNumber = [i] + 1;
            // console.log(cardNumber);
            // favRecipe.addClass(cardNumber);
            // console.log(favRecipe.class);
                
        // })

        // 2l. append favRecipe to cardContent El
        cardContentEl.append(favRecipe); 

        // // 2m. add event listener to add to favorites list
        // $("#favButton").click(addToFavorites(currentRecipe));

        // 3Aa. create card reveal div and set classes
        var cardRevealEl = $("<div>");
        cardRevealEl.addClass("card-reveal");

        // 3Ab. create <span> for revealed title
        var revealedTitle = $("<span>").text(currentRecipe.label);
        revealedTitle.addClass("card-title grey-text text-darken-4");

        // 3Ac. create <i> element for revealed title
        var revealedIEl = $("<i>");
        revealedIEl.addClass("material-icons right");

        // 3Ad. append revealedIEl to revealedTitle
        revealedTitle.append(revealedIEl);

        // 3Af. append revealedTitle to cardRevealEl
        cardRevealEl.append(revealedTitle);
        cardRevealEl.append($("<hr/>"));

        //3Ag. append cardRevealEl to cardContainer
        cardContainer.append(cardRevealEl);

        // 3Ba. create yield <p> el
        var servingsEl = $("<span>").text("Yield: " + currentRecipe.yield);
        // 3Bb. create break el
        var breakEl = $("<br/>");

        // 3Bc. create calories <p> el
        var caloriesEl = $("<span>").text("Calories: " + Math.round(currentRecipe.calories));


        // TEMPORARY APPEND FOR TESTING
        cardRevealEl.append(servingsEl);
        cardRevealEl.append(breakEl);
        cardRevealEl.append(caloriesEl);


        // append card reveal to card container
        cardContainer.append(cardRevealEl);

        // append card container to data display
        dataDisplayContainer.append(cardContainer);
    }
//  2m. add event listener to add to favorites list
 $("#favButton").click(function (event){
    var favListEl = currentRecipe.label;
    console.log(event.target);
});
}
recipeBtnSubmit.addEventListener("submit",
getRecipes("Beef"));