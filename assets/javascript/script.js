var topics = ["Jon Snow", "Daenerys Targaryen", "House Stark", "King Joffrey", "White Walker", "Lady Melisandre"];
renderButtons();
$(document).on("click", ".topic", displayGifs);
function renderButtons() {
    $("#buttonsView").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("topic");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttonsView").append(a);
        }
    }
    $("#addGif").on("click", function(event) {
        event.preventDefault();
        var searchName = $("#gifInput").val().trim();
        topics.push(searchName);
        renderButtons();
    });
    function displayGifs(){
        $("#gifView").empty();
        var searchName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchName + "&api_key=faD9ff56kFqwWvEIR0hUffcQGU5Q1FJa&limit=10";
        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var actionState = results[i].images.fixed_height.url;
                var stillState = results[i].images.fixed_height_still.url;
                var gifDiv = $("<div class='gifHold'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var resultsImage = $("<img class='item'>");
                resultsImage.attr("src", stillState);
                resultsImage.attr("data-still", stillState);
                resultsImage.attr("data-animate", actionState);
                var state = resultsImage.attr("data-state", "still");
                gifDiv.prepend(p);
                gifDiv.prepend(resultsImage);
                $("#gifView").prepend(gifDiv);       
            };
            $(".item").on("click", function(){
                if ($(this).attr("data-state") ===  "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate")
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        }); 
    }
      
    



  


 
    