$(function () {
  const maxCharacters = 140;
  $("#tweet-text").on("input", function (event) {
    // clear and hide errors
    $("#errors").empty().hide();

    // calculate remaining characters, set counter
    let remainingCharacters = maxCharacters - $(this).val().length;
    const $counter = $(this).parents("form").find(".counter");
    $counter.text(remainingCharacters);
    // indicate when maxCharacters reached
    if (remainingCharacters < 0) {
      $counter.addClass("warn");
    } else {
      $counter.removeClass("warn");
    }
  });
});