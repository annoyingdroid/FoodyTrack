$(document).ready(function(){
    $('select').formSelect();
  });
      




// declare get recipes function
var getRecipes = function (qParam) {
    var apiUrl = "https://api.edamam.com/api/recipes/v2?type=public&app_id=b08dc2fb&app_key=783268a2de0b8c46cf30721531506847&q=" + qParam;

    // make request to the url
    fetch(apiUrl).then(function (response) {
        response.json().then(function (recipes) {
            console.log(recipes);
        })
    });
};

getRecipes("chicken");



// start dynamic card creation
