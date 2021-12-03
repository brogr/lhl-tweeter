// TODO: sort tweets desc

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {

  // on scroll: toggle footer with top-link
  // throttling thanks to https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
  let lastKnownScrollPosition = 0;
  let ticking = false;
  $(window).scroll(function (event) {
    lastKnownScrollPosition = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        toggleFooter(lastKnownScrollPosition);
        ticking = false;
      });
      ticking = true;
    }
  });

  // compose new tweet button: toggle form area, scroll to form and focus on textarea
  $(".new-tweet-button").on("click", function () {
    $(".new-tweet").toggle(function () {
      if ($(this).css("display") !== "none") {
        $(this).get(0).scrollIntoView();
        $(this).find("#tweet-text").focus();
      }
    });
  });

  // compose new tweet form: submit
  $(".new-tweet form").on("submit", submitForm);

  // fetch tweets data, then render them
  loadTweets(renderTweets);
});

// toggleFooter: invoked on scroll
const toggleFooter = function (scrollTop) {
  $footer = $(".footer");
  // const topH = $(".header").height() + $(".new-tweet").height();
  const topH = $("#tweets").offset().top;
  if (scrollTop >= topH) {
    // scrolled below margin: show footer
    if ($footer.is(":hidden")) {
      $footer.show();
    }
  } else {
    // scrolled above margin: hide foooter
    if ($footer.is(":visible")) {
      $(".footer").hide();
    }
  }
};

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
  if ($(this).find(".counter").hasClass("error")) {
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
    // reverse order to sort DESC
    data.reverse();
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
        <span>
          <img src="${tweetData.user.avatars}" />
          ${tweetData.user.name}
        </span> 
        <span class="handle">${tweetData.user.handle}</span>
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
