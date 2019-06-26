// load articles to page
function getResults(){
  // empty any articles currently on the page
  $("#articles").empty();
  // Grab the articles as a json
  $.getJSON("/articles", function(data) {
    // for each article
    for (var i = 0; i < data.length; i++) {
      // display info to page
      $("#articles").append("<section data-id'" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].summary + "</section>");
      $("#articles").append("<button class=btn-small id=save>Save Article</button>")
    }
  });
};
// Run the getResults function when scrape articles button is clicked
$("#download-button").click(function(){
  getResults();  
});

// Whenever someone clicks on a section tag 
$(document).on("click", "section", function() {
  // open the article link
  $("section").load("data[i].link");
})
  
  // Whenever someone clicks a p tag
  $(document).on("click", "p", function() {
    // Empty the notes from the note section
    $("#comments").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
    
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#comments").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#comments").append("<input id='titleinput' name='title' >");
      // A textarea to add a new comment body
      $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new comment, with the id of the article saved to it
      $("#comments").append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");
      
      // If there's a comment in the article
      if (data.comment) {
        // Place the title of the commnet in the title input
        $("#titleinput").val(data.comment.title);
        // Place the body of the comment in the body textarea
        $("#bodyinput").val(data.comment.body);
      }
    });
  });

// When you click the savecomment button
$(document).on("click", "#savecomment", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the comment, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from comment textarea
        body: $("#bodyinput").val()
        }
    })
        // With that done
        .then(function(data) {
            // Log the response
            console.log(data);
            // Empty the comments section
            $("#comments").empty();
        });
    // Also, remove the values entered in the input and textarea for comment entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});