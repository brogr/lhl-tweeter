// TODO: sort tweets desc

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {
  /* 
  // invoke timeago for tweets' dates
  document.querySelectorAll(".tweet time").forEach((timeEl) => {
    timeEl.textContent = timeago.format(timeEl.textContent);
  }); 
  */

  // new tweet form: submit
  $(".new-tweet form").on("submit", submitForm);

  // fetch tweets data, then render them
  loadTweets(renderTweets);
});

// submitForm: new tweet form handler to validate and post data via AJAX
const submitForm = function (event) {
  event.preventDefault();

  // clear and hide errors
  $("#errors").empty().hide();

  // validate
  $newText = $(this).find("#tweet-text");
  if ($newText.val() == "") {
    // alert("Error: text is empty");
    $("#errors").append("<p>Error: text is empty</p>").show();
    return false;
  }
  if ($(this).find(".counter").hasClass("warn")) {
    // alert("Error: text is too long");
    $("#errors").append("<p>Error: text is too long</p>").show();
    return false;
  }
    
  // AJAX post
  // console.log($(this).serialize());
  $.ajax($(this).attr("action"), {
    method: "POST",
    data: $(this).serialize(),
  }).done(function (msg) {
    loadTweets(renderTweets);
  });
};

// loadTweets: fetch tweets from the http://localhost:8080/tweets page
const loadTweets = function (callback) {
  const url = "/tweets";
  $.ajax(url).done(function (data) {
    // render tweets data
    callback(data);
  });
};

// renderTweets: takes in an array of tweet objects, sends each to createTweetElement() and appends it to the #tweets container
const renderTweets = function (tweetsData) {
  $("#tweets").empty();
  tweetsData.forEach((tweetData) => {
    const $tweet = createTweetElement(tweetData);
    $("#tweets").append($tweet); // add it to the DOM
  });
};

// createTweetElement: takes in a tweet object and returns a tweet <article> element containing the entire HTML structure of the tweet
const createTweetElement = function(tweetData) {
  const $tweet = $(`
    <article class="tweet">
      <header>
        <span><i class="fas fa-user-astronaut"></i> ${
          tweetData.user.name
        }</span> <span class="user">${tweetData.user.handle}</span>
      </header>
      <section>
        <p>${escape(tweetData.content.text)}</p>
      </section>
      <footer>
        <time>${timeago.format(tweetData.created_at)}</time>
        <span class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>
    </article>
  `);
  return $tweet;
};

// escape function for user input text
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
