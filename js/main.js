var startActive;
var startBreak;
var startTime;
var remainedTime;

function startTimer() {
  clearInterval(startBreak)
  startActive = setInterval(remainingActiveTime, 1000);
  document.getElementById("remainingTime").innerHTML = document.forms.settingsForm.activeTime.value + ":00";
  startTime = Number(new Date());
}

function resetTimer() {
  clearInterval(startActive);
  document.getElementById("remainingTime").innerHTML = document.forms.settingsForm.activeTime.value + ":00";
  setActiveTime();
}

function resetBreakTimer() {
  clearInterval(startBreak);
  setBreakTime();
}

function setActiveTime() {
  var activeTime = document.forms.settingsForm.activeTime.value * 60000;//get from user
  document.getElementById("activeTimeValue").innerHTML = document.forms.settingsForm.activeTime.value + ":00";
  var finishTime = startTime + activeTime;
  return finishTime
}

function setBreakTime() {
  var breakTime = document.forms.settingsForm.shortBreak.value * 60000;//get from user
  document.getElementById("breakTimeValue").innerHTML = document.forms.settingsForm.shortBreak.value + ":00";
  var finishTime = startTime + breakTime;
  return finishTime
}

function remainingActiveTime() {
  var currentTime = Number(new Date());
  remainedTime = setActiveTime() - currentTime;
  remainingSeconds = ((remainedTime % 60000) / 1000).toFixed(0);
  remainingMinutes = Math.floor(remainedTime / 60000);
  if (remainedTime < 0) {
    return startBreakTimer();
  }
  document.getElementById("remainingTime").innerHTML = 
  remainingSeconds == 60 ? (remainingMinutes+1) + ":00" : remainingMinutes + ":" + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
}

function remainingBreakTime() {
  var currentTime = Number(new Date());
  remainedTime = setBreakTime() - currentTime;
  remainingSeconds = ((remainedTime % 60000) / 1000).toFixed(0);
  remainingMinutes = Math.floor(remainedTime / 60000);
  if (remainedTime < 0) {
    return startTimer();
  }
  document.getElementById("remainingTime").innerHTML = 
  remainingSeconds == 60 ? (remainingMinutes+1) + ":00" : remainingMinutes + ":" + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
}

function startBreakTimer() {
  clearInterval(startActive)
  startBreak = setInterval(remainingBreakTime, 1000);
  startTime = Number(new Date());
}