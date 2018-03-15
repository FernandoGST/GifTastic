$(document).ready(function() {

    //start buttons

    var topics = ["Titanic", "LOTR", "Pulp Fiction", "Coco", "13 Hours", "Bright"];

    //display function

    function displayInfo() {
        var movie = $(this).attr("movie-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=bhJoACrtFTnvCFhMWjzVtFPCc0srCJxj";

        //AJAX

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            $("#movies").empty();

            var results = response.data;

            //for loop

            for (var i = 0; i < results.length; i++) {
                var movieDiv = $("<div class='userMovie'>");

                //rating

                var rating = results[i].rating;
                var pRate = $("<p>").text("Rating: " + rating);

                //animated and stills

                var urlStill = results[i].images.fixed_height_still.url;
                var urlPlay = results[i].images.fixed_height.url;

                //pause

                var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");

                //appending gif

                movieDiv.append(gif);
                movieDiv.append(pRate);

                $("#movies").append(movieDiv);
            }

            //click functions

            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

            });
        });

    }

    //create buttons

    function renderButtons() {

        //reset buttons

        $("#movieButtons").empty();

        //loop through array

        for (var i = 0; i < topics.length; i++) {

            var movieRender = $("<button>");

            //add class and attribute of name so display function knows what to GET.

            movieRender.addClass("movie");
            movieRender.attr("movie-name", topics[i]);
            movieRender.text(topics[i]);
            $("#movieButtons").append(movieRender);
        }
    }

    //add button on click 

    $("#addMovie").on("click", function(event) {
        event.preventDefault();
        var movie = $("#movie-input").val().trim();
        topics.push(movie);
            $("#movie-input").val(" ");
        renderButtons();
    });


    //run display on click
    $(document).on("click", ".movie", displayInfo);

    //show buttons on page load
    renderButtons();

});
