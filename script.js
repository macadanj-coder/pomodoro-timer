
let defaultWorkDuration = 25 * 60; // 25 minutes in seconds
let defaultBreakDuration = 5 * 60; // 5 minutes in seconds

let longWorkDuration = 50 * 60; // 50 minutes in seconds
let longBreakDuration = 15 * 60; // 15 minutes in seconds

let workDuration = 25 * 60; // 25 minutes
let breakDuration = 5 * 60; // 5 minutes
let timer; // To hold the timer interval    

let timeLeft = workDuration; // Initialize time left to work duration

let isRunning = false; // To track if the timer is running
let isWorkMode = true; // To track if it's work time or break time  
let autoStartNextSession = true; // To track if the next session should start automatically

let completedPomodoros = 0; // To track completed pomodoros



function updateTabTitle() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.title = `${formattedTime} - Pomodoro Timer`;
}

function updateTimerDisplay() { 
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timer').textContent = formattedTime;
    updateTabTitle();
}

function updateSessionCount() {
    completedPomodoros++;
    document.getElementById('pomodoro-count').textContent = `done: ${completedPomodoros}`;
}

function requestNotificationPermission() {
     // Check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notifications");
        return;
    }

    if (Notification.permission === 'granted') {
        console.log('Notification permission already granted.');    
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            console.log('Notification permission:', permission);
        })
    } else {
        alert('Notification permission is denied. Please enable it in your browser settings.');
    }
}

function sendNotification(title, options) {
    if (Notification.permission === 'granted') {
        new Notification(title, options);
    } else {
        requestNotificationPermission();
    }
}

function switchMode() {
    isWorkMode = !isWorkMode;
    timeLeft = isWorkMode ? workDuration : breakDuration;
    if (autoStartNextSession && !isRunning) {
        startTimer();
    }
    document.getElementById("pomodoro-type").textContent =
        isWorkMode ? "Work" : "Break";
    const notificationTitle = isWorkMode ? 'Work Time!' : 'Break Time!';
    const notificationBody = isWorkMode ? 'It is work time now!' : 'It is break time now!';
    sendNotification(notificationTitle, {
        body: notificationBody,
        icon: 'favicon.ico'
    });
}

function startTimer() {
        if (isRunning) return; // Prevent multiple timers
        sendNotification('Pomodoro Timer Started', {
                body: 'The timer has started. Focus time begins now!',
                icon: 'favicon.ico'
        });

        isRunning = true;
        timer = setInterval(() => {
                timeLeft--;
                updateTimerDisplay();
                if (timeLeft <= 0) {
                        clearInterval(timer);
                        isRunning = false;
                        switchMode();
                        updateSessionCount();
                }
        }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    pauseTimer();
    isWorkMode = true;
    timeLeft = workDuration;
    document.getElementById("pomodoro-type").textContent = "Work";
    updateTimerDisplay();
}
