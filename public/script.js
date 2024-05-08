document.addEventListener('DOMContentLoaded', function() {
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const currentMonthDisplay = document.getElementById('current-month');
    const calendarBody = document.querySelector('.calendar-body');
  
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
        const calendarDay = document.createElement('div');
        calendarDay.classList.add('days');
        calendarDay.textContent = day;
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
          calendarDay.classList.add('today'); // Add 'today' class to today's date
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
  });
  