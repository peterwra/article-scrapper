// Save our article when the user clicks the button
$(document).on("click", ".save-article", function () {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId + "/true"
  }).then(function (data) {
    location.href = "/";
  });
});

// Remove from saved articles when the user clicks the button
$(document).on("click", ".unsave-article", function () {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId + "/false"
  }).then(function (data, err) {
    location.href = "/savedarticles";
  });
});


// Whenever someone clicks a p tag
$(document).on("click", ".notes", function () {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        for (var i = 0; i < data.note.length; i++) {
          $("#notes").append("<br><br>");
          $("#notes").append("<h3>" + data.note[i].title + "</h3>");
          $("#notes").append("<h4>" + data.note[i].body + "</h4>");
        }
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// Get articles when the scrape button is clicked
$(document).on("click", "#scrap-articles", function () {
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function () {
    location.reload();
  })
});

// See saved articles when button is clicked
$(document).on("click", "#home-page", function () {
  $.ajax({
    method: "GET",
    url: "/"
  }).then(function () {
    location.reload();
    location.href = "/"
  })
});

// See saved articles when button is clicked
$(document).on("click", "#saved-articles", function () {
  $.ajax({
    method: "GET",
    url: "/savedarticles"
  }).then(function () {
    location.reload();
    location.href = "/savedarticles"
  })
});
