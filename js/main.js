var activityTime, shortBreakTime, longBreakTime;
var activeCounter = 1, shortBreakCounter = 0 , longBreakCounter = 1;
var startTimer;

function setTimerAndStart() {
  activityTime = (document.forms.settingsForm.active.value * 60000);
  shortBreakTime = (document.forms.settingsForm.shortBreak.value * 60000);
  longBreakTime = (document.forms.settingsForm.longBreak.value * 60000);
  intervalSetter(activityTime);
}

function resetTimer() {
  clearInterval(startTimer);
  document.getElementById("remainingTime").innerHTML = "--:--"
}

function showSliderValue(event) {
  document.getElementById(event.target.name + "TimeValue").innerHTML = event.target.value + ":00";
}

function whatUserMustDo() {
  if (activeCounter / 4 === longBreakCounter) { //true means user need a long break
    longBreakCounter++ ;
    shortBreakCounter++ ;
    intervalSetter(longBreakTime);
    return;
  } else if (activeCounter === shortBreakCounter) { //true means user need an activity
    activeCounter++ ;
    intervalSetter(activityTime);
    return;
  } else if(activeCounter !== shortBreakCounter) { //true means user need a short break
    shortBreakCounter++ ;
    intervalSetter(shortBreakTime);
    return;
  }
}

function intervalSetter(time) { //showimg remaining time every 1 second
  var startTime = Number(new Date());
  clearInterval(startTimer);
  startTimer = setInterval(function() { remainingTime(time + startTime) }, 1000);
}

function remainingTime(endTime) { //calculating remaining time of activity, short and long break
  var currentTime = Number(new Date());
  remainedMilliSeconds = endTime - currentTime;
  remainingSeconds = ((remainedMilliSeconds % 60000) / 1000).toFixed(0);
  remainingMinutes = Math.floor(remainedMilliSeconds / 60000);
  if (remainedMilliSeconds < 0) {
    whatUserMustDo();
    remainingSeconds = 0;
    remainingMinutes = 0;
  }
  document.getElementById("remainingTime").innerHTML = 
  remainingSeconds == 60 ? (remainingMinutes+1) + ":00" : remainingMinutes + ":" + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
}