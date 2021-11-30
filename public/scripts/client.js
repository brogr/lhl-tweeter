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

  // Fake data taken from initial-tweets.json
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];
  renderTweets(data);
});

// renderTweets: takes in an array of tweet objects, sends each to createTweetElement() and appends it to the #tweets container
const renderTweets = function (tweetsData) {
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

