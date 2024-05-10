var log = console.log; 
var x ; 

document.addEventListener('DOMContentLoaded', function() {
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const currentMonthDisplay = document.getElementById('current-month');
    const calendarBody = document.querySelector('.calendar-body');
    const streakForm = document.querySelector("#streak-form"); 
    var startDate = document.querySelector("#startDate"); 
    var endDate = document.querySelector("#endDate"); 
    startDate = new Date(startDate.value); 
    endDate = new Date(endDate.value); 

    const streakLength = Math.ceil((endDate-startDate)/(1000*60*60*24) ) + 1;
    if (streakLength >1){
      $("h1").text("Streak : " + streakLength + " Days!!"); 
    }
    

    log(startDate); 
    log(endDate); 
    // const startDateDay = startDate.value.getDate(); 
    // const endDateDay = endDate.value.getDate(); 
    // const streakStartMonth = startDate.value.getMonth(); 
    // const streakEndMonth = endDate.value.getMonth(); 
  
    let currentMonth = 4; // May (zero-based index)
    let currentYear = 2024;
  
    // Function to render the calendar
    function renderCalendar(month, year) {
      // Clear previous calendar
      calendarBody.innerHTML = '';
  
      // Set the current month display
      currentMonthDisplay.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;
  
      // Get the first day of the month
      const firstDayOfMonth = new Date(year, month, 1).getDay();
  
      // Get the number of days in the month
      const daysInMonth = new Date(year, month + 1, 0).getDate();
  
      // Get today's date
      const today = new Date();
  
      // Generate the calendar days
      for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('days');
        calendarBody.appendChild(emptyDay);
      }
  
      for (let day = 1; day <= daysInMonth; day++) {
        const calendarDate = new Date(year, month, day); 
        const calendarDay = document.createElement('div');
        calendarDay.classList.add('days');
        calendarDay.textContent = day;
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
          calendarDay.classList.add('today'); // Add 'today' class to today's date
        }

        if(startDate <= calendarDate && calendarDate<=endDate){
          $(calendarDay).addClass("strikthrough"); 
        }
        calendarBody.appendChild(calendarDay);
      }
    }
  
    // Render initial calendar
    renderCalendar(currentMonth, currentYear);
  
    // Event listener for previous month button
    prevMonthBtn.addEventListener('click', function() {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar(currentMonth, currentYear);
    });
  
    // Event listener for next month button
    nextMonthBtn.addEventListener('click', function() {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar(currentMonth, currentYear);
    });

    var dateBlock = $("div.days"); 

$("div.days").on('click', function(){
  const selectedDate = new Date(currentYear, currentMonth, this.textContent); 
  $(this).toggleClass("strikthrough"); 
  streakForm.elements['selectedDate'].value = selectedDate.toDateString(); 
  streakForm.submit(); 
})

document.getElementById('activities').addEventListener('change', function() {
  var selectBox = document.getElementById('activities');
  var userInput = document.getElementById('newActivity');
  if (selectBox.value === 'addNew') {
      userInput.style.display = 'block';
      $("#new-activity-label").prop("hidden", false);
      $("#new-activity-btn").prop("hidden", false);     
  } else {
      userInput.style.display = 'none';
      document.getElementById("selectActivity").submit(); 
  }
  
});

$("#new-activity-btn").on("click", function(){
  document.getElementById("selectActivity").submit(); 
})

document.getElementById("activities").value = $("#activities").attr('value'); 

x = $("#activities"); 
  });
  

