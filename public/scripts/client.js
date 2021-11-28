/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function () {
  document.querySelectorAll(".tweet time").forEach((timeEl) => {
    timeEl.textContent = timeago.format(timeEl.textContent);
  });
});
