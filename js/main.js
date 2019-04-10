"use strict";

var activityTime, shortBreakTime, longBreakTime, numberOfRounds;
var activeCounter = 1,
  shortBreakCounter = 0,
  longBreakCounter = 1;
var startTimer;

function setTimerAndStart() {
  activityTime = document.forms.settingsForm.active.value * 60000;
  shortBreakTime = document.forms.settingsForm.shortBreak.value * 60000;
  longBreakTime = document.forms.settingsForm.longBreak.value * 60000;
  numberOfRounds = document.forms.settingsForm.rounds.value;
  intervalSetter(activityTime);
}

function resetTimer() {
  clearInterval(startTimer);
  document.getElementById("remainingTime").innerHTML = "--:--";
}

function showSliderValue(event) {
  try {
    document.getElementById(event.target.name + "TimeValue").innerHTML =
    event.target.value + ":00";
  } catch (error) {
    document.getElementById(event.target.name + "Value").innerHTML =
    event.target.value;
  }
}

function whatUserMustDo() {
  if (activeCounter / numberOfRounds === longBreakCounter) {
    //true means user need a long break
    longBreakCounter++;
    shortBreakCounter++;
    return intervalSetter(longBreakTime);
  } else if (activeCounter === shortBreakCounter) {
    //true means user need an activity
    activeCounter++;
    return intervalSetter(activityTime);
  } else if (activeCounter !== shortBreakCounter) {
    //true means user need a short break
    shortBreakCounter++;
    return intervalSetter(shortBreakTime);
  }
}

function intervalSetter(time) {
  //showimg remaining time every 1 second
  var startTime = Number(new Date());
  clearInterval(startTimer);
  startTimer = setInterval(function() {
    remainingTime(time + startTime);
  }, 1000);
}

function remainingTime(endTime) {
  //calculating remaining time of activity, short and long break
  var currentTime = Number(new Date());
  var remainedMilliSeconds = endTime - currentTime;
  var remainingSeconds = ((remainedMilliSeconds % 60000) / 1000).toFixed(0);
  var remainingMinutes = Math.floor(remainedMilliSeconds / 60000);
  if (remainedMilliSeconds < 0) {
    whatUserMustDo();
    remainingSeconds = 0;
    remainingMinutes = 0;
  }
  document.getElementById("remainingTime").innerHTML =
    remainingSeconds == 60
      ? remainingMinutes + 1 + ":00"
      : remainingMinutes +
        ":" +
        (remainingSeconds < 10 ? "0" : "") +
        remainingSeconds;
}