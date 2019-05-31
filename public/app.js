// Grab the articles as a json
$.getJSON("/articles", function (data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<hr><div class='card'><div class='card-body'><h5 class='card-title'>" + data[i].title + "</h5><p class='card-text'>" + data[i].link +
      "</p><div class='btn-group' role='group'><button class='btn btn-primary save-article' data-id='" + data[i]._id + "'>Save This Article</button>" +
      "<button class='btn btn-secondary notes' data-id='" + data[i]._id + "'>Add/View Notes</button>" + 
      "<button class='btn btn-danger delete-article' data-id='" + data[i]._id + "'>Delete Article</button></div>");
  }
});

// Save our article when the user clicks the button
$(document).on("click", ".save-article", function () {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId
  }).then(function (data) {
    console.log(data);
    location.reload();
  });
});

// Delete article when the user clicks the button
$(document).on("click", ".delete-article", function () {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "DELETE",
    url: "/articles/" + thisId
  }).then(function (data) {
    console.log(data);
    location.reload();
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
})