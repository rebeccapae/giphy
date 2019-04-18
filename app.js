// Global Variable s
var clicked = false;

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
    console.log(animal);
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
        $("#gifDiv").empty();

            // For loop to create and append the gifs to the page
            for (i = 0; i < 10; i++) {
            var imgDiv = $("<img>");
            imgDiv.attr({"src": response.data[i].images.original_still.url, "data-still": response.data[i].images.original_still.url, "data-animate": response.data[i].images.original.url, "data-state": "still"});
            imgDiv.addClass("gif");
            $("#gifDiv").append(imgDiv);

            // To include the rating
            var rating = response.data[i].rating
            console.log(rating);
            var pRating = $("<p>");
            pRating.text("Rating: " + rating);
            $("#gifDiv").append(pRating);

            };

            // To pause/unpause a gif for a click event
            $(".gif").on("click", function() {
            console.log("gif clicked");
            var state = $(this).attr("data-state");

            if(state == "still") {
                console.log("still state: " + state)
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else {
                $(this).attr("src", $(this).attr("data-still"));
                console.log("animate state: " + state);
                $(this).attr("data-state", "still");
            };

            });

        });
    });
};

// Run this functino for the first three pre-populated animal buttons
animalButtonClicked();

