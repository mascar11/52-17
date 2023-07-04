document.addEventListener("DOMContentLoaded", function() {
  // Constants for durations
  const WORK_DURATION = 52 * 60; // 52 minutes in seconds
  const BREAK_DURATION = 17 * 60; // 17 minutes in seconds

  // Variables
  let timer;
  let remainingTime = WORK_DURATION;
  let currentMode = "work";

  // DOM elements
  const startButton = document.getElementById("start");
  const pauseButton = document.getElementById("pause");
  const resetButton = document.getElementById("reset");
  const timerLabel = document.getElementById("timer-label");
  const timeLeft = document.getElementById("time-left");

  // Event listeners
  startButton.addEventListener("click", startTimer);
  pauseButton.addEventListener("click", pauseTimer);
  resetButton.addEventListener("click", resetTimer);

  // Timer functions
  function startTimer() {
    timer = setInterval(updateTimer, 1000);
    startButton.disabled = true;
    pauseButton.disabled = false;
  }

  function pauseTimer() {
    clearInterval(timer);
    startButton.disabled = false;
    pauseButton.disabled = true;
  }

  function resetTimer() {
    clearInterval(timer);
    remainingTime = WORK_DURATION;
    currentMode = "work";
    timerLabel.textContent = "Work";
    timeLeft.textContent = formatTime(remainingTime);
    startButton.disabled = false;
    pauseButton.disabled = true;
  }

  function updateTimer() {
    remainingTime--;
    timeLeft.textContent = formatTime(remainingTime);

    // Calculate progress percentage
    const totalDuration = currentMode === "work" ? WORK_DURATION : BREAK_DURATION;
    const progressPercentage = ((totalDuration - remainingTime) / totalDuration) * 100;

    // Update the progress bar
    const progressBar = document.getElementById("progress");
    progressBar.style.width = progressPercentage + "%";

    // Update page title
    document.title = formatTime(remainingTime) + " | 52/17 App";

    if (remainingTime === 0) {
      clearInterval(timer);

      if (currentMode === "work") {
        remainingTime = BREAK_DURATION;
        currentMode = "break";
        timerLabel.textContent = "Break";
      } else {
        remainingTime = WORK_DURATION;
        currentMode = "work";
        timerLabel.textContent = "Work";
      }

      timeLeft.textContent = formatTime(remainingTime);
      startButton.disabled = false;
      pauseButton.disabled = true;
    }
  }

  // Utility function to format time in MM:SS format
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds)
    );
  }
});
