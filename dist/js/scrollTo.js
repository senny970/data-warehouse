$(function () {
  $("#linkAbout").on("click", function (e) {
    $("html,body")
      .stop()
      .animate({ scrollTop: $("#storageBank").offset().top }, 1000);
    e.preventDefault();
  });

  $("#linkFeatures").on("click", function (e) {
    $("html,body")
      .stop()
      .animate({ scrollTop: $("#features").offset().top }, 1000);
    e.preventDefault();
  });

  $("#learnMore").on("click", function (e) {
    $("html,body")
      .stop()
      .animate({ scrollTop: $("#storageBank").offset().top }, 1000);
    e.preventDefault();
  });
});