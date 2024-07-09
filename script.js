document.addEventListener('DOMContentLoaded', function() {
  const countrySelect = document.getElementById('countrySelect');
  const countries = {
    'Asia/Kolkata': 'India',
    'America/New_York': 'USA',
    'Africa/Johannesburg': 'South Africa',
    'Europe/London': 'UK',
    'Europe/Berlin': 'Germany',
    'Asia/Tokyo': 'Japan',
    'Australia/Sydney': 'Australia',
    'America/Sao_Paulo': 'Brazil',
    'America/Mexico_City': 'Mexico',
    'Asia/Shanghai': 'China',
    'Asia/Dubai': 'UAE',
    'America/Toronto': 'Canada',
    'Europe/Paris': 'France',
    'Europe/Rome': 'Italy',
    'Africa/Cairo': 'Egypt',
    'Asia/Singapore': 'Singapore'
  };

  let selectedTimezone = 'Asia/Kolkata';

  function updateClock() {
    const now = new Date();
    const options = { timeZone: selectedTimezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const formatter = new Intl.DateTimeFormat([], options);
    const [{ value: hours }, , { value: minutes }, , { value: seconds }, , { value: ampm }] = formatter.formatToParts(now);

    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    document.getElementById('ampm').textContent = ampm;

    const selectedCountry = countries[selectedTimezone];
    const timeMessage = `Time in ${selectedCountry}: ${hours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById('timeMessage').textContent = timeMessage;
  }

  countrySelect.addEventListener('change', function() {
    selectedTimezone = countrySelect.value;
    updateClock();
  });

  setInterval(updateClock, 1000);

  // Timer functionality
  let timerInterval;

  document.getElementById('startTimer').addEventListener('click', function() {
    const minutesInput = document.getElementById('minutesInput').value;
    const secondsInput = document.getElementById('secondsInput').value;

    let timerMinutes = parseInt(minutesInput, 10);
    let timerSeconds = parseInt(secondsInput, 10);

    if (isNaN(timerMinutes) || isNaN(timerSeconds) || timerMinutes < 0 || timerSeconds < 0 || timerSeconds >= 60) {
      document.getElementById('timerMessage').textContent = 'Please enter valid minutes and seconds.';
      return;
    }

    clearInterval(timerInterval);

    document.getElementById('timerDisplay').style.display = 'block';
    document.getElementById('timerMinutes').textContent = timerMinutes < 10 ? '0' + timerMinutes : timerMinutes;
    document.getElementById('timerSeconds').textContent = timerSeconds < 10 ? '0' + timerSeconds : timerSeconds;

    timerInterval = setInterval(function() {
      if (timerSeconds === 0) {
        if (timerMinutes === 0) {
          clearInterval(timerInterval);
          document.getElementById('timerSound').play();
          document.getElementById('timerMessage').textContent = 'Time is up!';
          return;
        }
        timerMinutes--;
        timerSeconds = 59;
      } else {
        timerSeconds--;
      }

      document.getElementById('timerMinutes').textContent = timerMinutes < 10 ? '0' + timerMinutes : timerMinutes;
      document.getElementById('timerSeconds').textContent = timerSeconds < 10 ? '0' + timerSeconds : timerSeconds;
    }, 1000);
  });

  // Stopwatch functionality
  let stopwatchInterval;
  let stopwatchRunning = false;
  let stopwatchMinutes = 0;
  let stopwatchSeconds = 0;
  let stopwatchMilliseconds = 0;

  document.getElementById('startStopWatch').addEventListener('click', function() {
    if (!stopwatchRunning) {
      stopwatchRunning = true;
      stopwatchInterval = setInterval(function() {
        stopwatchMilliseconds += 10;
        if (stopwatchMilliseconds >= 1000) {
          stopwatchMilliseconds = 0;
          stopwatchSeconds++;
        }
        if (stopwatchSeconds >= 60) {
          stopwatchSeconds = 0;
          stopwatchMinutes++;
        }

        document.getElementById('stopWatchMinutes').textContent = stopwatchMinutes < 10 ? '0' + stopwatchMinutes : stopwatchMinutes;
        document.getElementById('stopWatchSeconds').textContent = stopwatchSeconds < 10 ? '0' + stopwatchSeconds : stopwatchSeconds;
        document.getElementById('stopWatchMilliseconds').textContent = stopwatchMilliseconds < 100 ? '0' + (stopwatchMilliseconds / 10) : stopwatchMilliseconds / 10;
      }, 10);
    }
  });

  document.getElementById('stopStopWatch').addEventListener('click', function() {
    if (stopwatchRunning) {
      stopwatchRunning = false;
      clearInterval(stopwatchInterval);
      const reason = document.getElementById('stopWatchReason').value;
      if (reason.trim()) {
        const recordRow = document.createElement('tr');
        const reasonCell = document.createElement('td');
        const timeCell = document.createElement('td');
        reasonCell.textContent = reason;
        timeCell.textContent = `${stopwatchMinutes}:${stopwatchSeconds}:${Math.floor(stopwatchMilliseconds / 10)}`;
        recordRow.appendChild(reasonCell);
        recordRow.appendChild(timeCell);
        document.getElementById('stopWatchRecords').appendChild(recordRow);
        document.getElementById('stopWatchReason').value = '';
      }
    }
  });

  document.getElementById('resetStopWatch').addEventListener('click', function() {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMilliseconds = 0;
    document.getElementById('stopWatchMinutes').textContent = '00';
    document.getElementById('stopWatchSeconds').textContent = '00';
    document.getElementById('stopWatchMilliseconds').textContent = '00';
  });
});