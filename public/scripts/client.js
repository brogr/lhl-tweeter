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

  // new tweet form: post via AJAX
  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();
    console.log($(this).serialize());
    $.ajax($(this).attr("action"), {
      method: 'POST',
      data: $(this).serialize()
    });
  });

  // fetch tweets data, then render them
  loadTweets(renderTweets);
});

// loadTweets: fetch tweets from the http://localhost:8080/tweets page
const loadTweets = function (callback) {
  const url = "http://localhost:8080/tweets";
  $.ajax(url).done(function (data) {
    // render tweets data
    callback(data);
  });
};

// renderTweets: takes in an array of tweet objects, sends each to createTweetElement() and appends it to the #tweets container
const renderTweets = function(tweetsData) {
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
        <span><i class="fas fa-user-astronaut"></i> ${tweetData.user.name}</span> <span class="user">${tweetData.user.handle}</span>
      </header>
      <section>
        <p>${tweetData.content.text}</p>
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

