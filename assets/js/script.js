const options = {
  firstHour: 9,
  lastHour: 23,
};

function generateTimeslots() {
  for (hour = options.firstHour; hour <= options.lastHour; hour++) {
    let savedTask = localStorage.getItem(hour) || "";
    let html = `<div class="row" data-hour="${hour}">
           <div class="col-sm-2 hour">${hour}</div>
           <div class="col-sm-8 row past">
                <textarea class="col-md-10 description">${savedTask}</textarea>
            </div>
            <div class="col-sm-2">
                <button class="btn btn-primary saveBtn">Save</button>
            </div>
          </div>          
        `;
    $(".container").append(html);
  }
}

function onSaveTask(event) {
  const hour = $(event.target).parent().parent().attr("data-hour");
  const task = $(event.target).parent().prev().children().val();

  localStorage.setItem(hour, task);

  console.log("saved");
}

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

function init() {
  generateTimeslots();

  updateTimeslots();

  $(".saveBtn").on("click", onSaveTask);

  const currentDay = dayjs().format("dddd MMMM YYYY, h:mm:ss a");
  $("#currentDay").text(currentDay);

  setInterval(function () {
    updateTimeslots();
  }, 10000);
}

init();
