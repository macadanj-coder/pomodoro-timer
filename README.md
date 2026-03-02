# Pomodoro Timer

A minimalist web-based Pomodoro Timer with integrated task management. Stay productive with customizable work and break intervals, desktop notifications, and a clean dark-mode interface.

## Features

### Timer Management
- **Standard Pomodoro**: 25 minutes work / 5 minutes break
- **Long Session**: 50 minutes work / 15 minutes break
- **Start, Pause, and Reset** controls
- **Auto-start next session** option for uninterrupted workflows
- **Browser tab title** updates with remaining time
- **Desktop notifications** when sessions complete (with permission)

### Task Tracking
- **Add tasks** while working or planning
- **Mark tasks complete** as you finish them
- **Persistent storage** using localStorage
- **Separate views** for active and completed tasks

### User Experience
- **Dark theme** with accent colors for work/break modes
- **Real-time timer display** with MM:SS format
- **Session counter** showing completed pomodoros
- **Responsive design** that works on desktop and mobile
- **Customizable styling** with CSS variables

## Project Structure

```
pomodoro-timer/
├── index.html          # Main HTML structure
├── style.css           # Original dark theme stylesheet
├── new_style.css       # Modern blue/purple variant (default)
├── script.js           # Timer logic and session management
├── todo.js             # Task management functionality
├── favicon.ico         # Browser favicon
└── README.md           # This file
```

## Files Overview

### [index.html](index.html)
The main entry point containing the timer display, control buttons, and task input interface.

### [script.js](script.js)
Handles all timer functionality:
- Timer countdown and display updates
- Work/break mode switching
- Session completion tracking
- Desktop notification system
- Mode selection (standard vs. long sessions)

### [todo.js](todo.js)
Manages the task list:
- Create and store tasks
- Toggle task completion status
- Persist data to localStorage
- Render task items dynamically

### [style.css](style.css)
Original stylesheet using consistent CSS variable naming with a dark gray theme.

### [new_style.css](new_style.css)
Modern theme variant with blue/purple accents. Currently set as the default theme with CSS variable naming that matches `style.css` for easy swapping.

## Getting Started

### Installation
1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. Optionally, run a local server for best results:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`

### First Use
1. Click **Start** to begin a work session
2. Add tasks in the "Tasks" input field
3. Check off completed tasks as you finish them
4. Take breaks when the timer signals completion
5. Enable **desktop notifications** when prompted for session alerts

## Customization

### Change Durations
Edit [script.js](script.js):
```javascript
let defaultWorkDuration = 25 * 60;    // Work session in seconds
let defaultBreakDuration = 5 * 60;    // Break session in seconds
let longWorkDuration = 50 * 60;       // Long work session
let longBreakDuration = 15 * 60;      // Long break
```

### Change Theme
In [index.html](index.html), switch the stylesheet link:
```html
<!-- Use new_style.css for modern blue/purple theme -->
<link rel="stylesheet" href="new_style.css">

<!-- Or use style.css for original dark gray theme -->
<link rel="stylesheet" href="style.css">
```

### Modify Colors
Both stylesheets use CSS variables. Edit the `:root` section:
```css
:root {
    --primary: #38bdf8;          /* Main accent color */
    --text: #f8fafc;             /* Text color */
    --container-bg: #172449;     /* Background */
    --success: #22c55e;          /* Work session color */
    /* ... more variables ... */
}
```

## Browser Support

- Modern browsers with ES6+ support
- localStorage API required for task persistence
- Notification API (optional, for desktop alerts)
- CSS Grid and Flexbox support

## Keyboard & Control Shortcuts
- **Start/Pause**: Click the Start/Pause button (could be enhanced with keyboard support)
- **Reset**: Click the Reset button to restart current session
- **Task Entry**: Type in the task input and click Add

## Future Enhancement Ideas

- Keyboard shortcuts (e.g., Space to pause, R to reset)
- Task categories and filtering
- Statistics dashboard (sessions per day, etc.)
- Sound notifications in addition to desktop alerts
- Export/import task history
- Multiple timer presets
- Dark/light mode toggle

## License

This project is open source and available for personal and educational use.

## Author

Created as a personal productivity tool.
