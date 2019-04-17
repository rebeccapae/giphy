// Test Global Variables (may not need later)
var clicked = false;

// Array containing all the animals
// var animalsArray = [];

// Capture the user's input into a variable when user clicks submit
$("#submit").on("click", function() {
    event.preventDefault();
    var userAnimal = $("#inputAnimal").val();
    // animalsArray.push(userAnimal);
    // console.log(animalsArray);
    console.log("userAnimal: " + userAnimal)

    //Clear the input field
    $("#inputAnimal").val("")

    // Make each animal into a button and append it to the animalButtons div 
    var animalButton = $("<button>");
    animalButton.attr("animal", userAnimal);
    animalButton.addClass("btn btn-light animalButton");
    animalButton.text(userAnimal);
    $("#animalButtons").append(animalButton);

    animalButtonClicked();
});

// When the user clicks on a button, run the AJAX function
function animalButtonClicked() {
    $(".animalButton").on("click", function() {
    clicked = true;
    console.log(clicked);
    var animal = $(this).attr("animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
        console.log(response);
        var results = response.data;
        console.log(results);
        
            // For loop to create and append the gifs to the page
            for (i = 0; i < 11; i++) {
            var imgDiv = $("<img>");
            imgDiv.attr({"src": response.data[i].images.fixed_height_still, "data-still": response.data[i].images.original_still, "data-animate": response.data[i].images.original_mp4, "data-state": "still"});
            imgDiv.addClass("gif");
            $("#gifDiv").append(imgDiv);
            };

            

        });
    });
};

// Run this functino for the first three pre-populated animal buttons
animalButtonClicked();
