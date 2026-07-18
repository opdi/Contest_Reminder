function getNextRecurringContests() {
    const now = new Date();
  
    // Calculate next occurrences
    const nextSaturday = getNextOccurrence(now, 6, 20, 0); // LeetCode Weekly: Saturday 8:00 PM
    const nextSundayMorning = getNextOccurrence(now, 0, 8, 0); // LeetCode Biweekly: Sunday 8:00 AM
    const nextSundayEvening = getNextOccurrence(now, 0, 19, 0); // GFG Rated Contest: Sunday 7:00 PM
  
    return [
      {
        platform: "LeetCode",
        name: "Weekly Contest",
        startTime: nextSaturday,
        endTime: new Date(nextSaturday.getTime() + 120 * 60 * 1000), // 2 hours duration
      },
      {
        platform: "LeetCode",
        name: "Biweekly Contest",
        startTime: nextSundayMorning,
        endTime: new Date(nextSundayMorning.getTime() + 120 * 60 * 1000), // 2 hours duration
      },
      {
        platform: "GeeksForGeeks",
        name: "GFG Rated Contest",
        startTime: nextSundayEvening,
        endTime: new Date(nextSundayEvening.getTime() + 90 * 60 * 1000), // 1.5 hours duration
      },
    ];
  }
  
  function getNextOccurrence(currentDate, targetDay, hour, minute) {
    const date = new Date(currentDate);
    const dayDifference = (targetDay - date.getDay() + 7) % 7 || 7; // Ensure it's the next occurrence
    date.setDate(date.getDate() + dayDifference);
    date.setHours(hour, minute, 0, 0); // Set time
    return date;
  }
  
  function displayAllContests() {
    const contestList = document.getElementById("contest-list");
    contestList.innerHTML = ""; // Clear previous entries
  
    const recurringContests = getNextRecurringContests();
    const staticContests = [
      { name: "GFG Weekly Challenge", platform: "GeeksForGeeks", startTime: new Date("2025-01-21T12:00:00") },
    ];
  
    const allContests = [...recurringContests, ...staticContests];
  
    allContests.forEach(contest => {
      const listItem = document.createElement("li");
  
      const startTime = contest.startTime.toLocaleString();
      const endTime = contest.endTime ? contest.endTime.toLocaleString() : "N/A";
  
      listItem.innerHTML = `
        <strong>${contest.name}</strong> - ${contest.platform} <br> 
        Starts at: ${startTime} <br> 
        Ends at: ${endTime} <br>
        <span class="countdown" data-start-time="${contest.startTime}">Loading countdown...</span>
      `;
  
      contestList.appendChild(listItem);
    });
  
    updateCountdowns();
  }
  
  function updateCountdowns() {
    const countdownElements = document.querySelectorAll(".countdown");
  
    countdownElements.forEach(element => {
      const startTime = new Date(element.dataset.startTime);
      const now = new Date();
      const timeRemaining = startTime - now;
  
      if (timeRemaining > 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
        element.textContent = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
      } else {
        element.textContent = "The contest has started!";
      }
    });
  
    // Update every second
    setTimeout(updateCountdowns, 1000);
  }
  
  // Call the display function when the page loads
  document.addEventListener("DOMContentLoaded", displayAllContests);
  