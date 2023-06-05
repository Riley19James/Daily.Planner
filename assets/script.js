$(document).ready(function () {
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);

  function updateTimeBlocks() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var hour = parseInt($(this).attr("id").split("-")[1]);

      if (hour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (hour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  updateTimeBlocks();

  $(".saveBtn").on("click", function () {
    var hour = $(this).parent().attr("id");
    var description = $(this).siblings(".description").val();

    localStorage.setItem(hour, description);
  });

  function loadEvents() {
    $(".time-block").each(function () {
      var hour = $(this).attr("id");
      var savedEvent = localStorage.getItem(hour);

      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  }

  loadEvents();
});
