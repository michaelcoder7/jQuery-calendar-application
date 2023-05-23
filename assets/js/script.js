const options = {
  firstHour: 9,
  lastHour: 23,
};

function updateTimeslots() {
  console.log("updateTimeslots");
  const currentHour = dayjs().hour();

  $(".time-block").each(function (index, element) {
    const hour = $(element).attr("data-hour");
    console.log(hour, currentHour);

    if (hour < currentHour) {
      $(element).find(".description").addClass("past");
    } else if (hour == currentHour) {
      $(element).find(".description").addClass("present");
    } else {
      $(element).find(".description").addClass("future");
    }
  });
}

function onSaveTask(event) {
  const hour = $(event.target).parent().parent().attr("data-hour");
  const task = $(event.target).parent().prev().children().val();

  localStorage.setItem(hour, task);

  console.log("saved");
}

function generateTimeslots() {
  for (hour = options.firstHour; hour <= options.lastHour; hour++) {}
}
