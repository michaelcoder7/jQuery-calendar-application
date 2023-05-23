// Constant variables
const options = {
  firstHour: 9,
  lastHour: 23,
};

// To generate timeslots
function generateTimeslots() {
  for (hour = options.firstHour; hour <= options.lastHour; hour++) {
    let savedTask = localStorage.getItem(hour) || "";
    let html = `<div class="row time-block" data-hour="${hour}">
           <div class="col-sm-2 hour">${hour}</div>
           <div class="col-sm-8 row past">
                <textarea class="col-sm-12 description">${savedTask}</textarea>
            </div>
            <div class="col-sm-2">
                <button class="btn btn-primary saveBtn" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button>
            </div>
          </div>          
        `;
    $(".container").append(html);
  }
}

// To update timeslots
function updateTimeslots() {
  console.log("updateTimeslots");
  const currentHour = dayjs().hour();

  $(".time-block").each(function (_index, element) {
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

function init() {
  // To load in the timeslots
  generateTimeslots();

  //To update the timeslot's background colours based on time of day
  updateTimeslots();

  //To setup save button
  $(".saveBtn").on("click", onSaveTask);

  //To show current day and time
  const currentDay = dayjs().format("dddd MMMM YYYY, h:mm:ss a");
  $("#currentDay").text(currentDay);

  setInterval(function () {
    updateTimeslots();
  }, 10000);
}

init();
