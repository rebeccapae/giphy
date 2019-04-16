// Array containing all the animals
var animalsArray = [];

// Capture the user's input into a variable when user clicks submit
$("#submit").on("click", function() {
    event.preventDefault();
    var userAnimal = $("#inputAnimal").val();
    animalsArray.push(userAnimal);
    console.log(animalsArray);
    console.log("userAnimal: " + userAnimal)
    //Clear the input field
    $("#inputAnimal").val("")

    // Make each animal into a button and append it to the animalButtons div 
    var animalButton = $("<button>");
    animalButton.attr("animal", userAnimal);
    animalButton.addClass("btn btn-light");
    animalButton.text(userAnimal);
    $("#animalButtons").append(animalButton);
});

// When the user clicks on a button, run the AJAX function
$(".btn btn-light").on("click", function() {
    var animal = $(this).attr("animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
        var results = response.data;
        console.log(results);
        });
});
