# Todo App

> A clean todo list app built with vanilla HTML, CSS, and JavaScript.

**Live Demo:** [annavoy.github.io/todo-app](https://annavoy.github.io/todo-app/)  
**Author:** [annavoy](https://github.com/annavoy)

---

## About

Simple task manager for daily to-dos. Tasks are saved in the browser — no account or backend required.

## Features

- Add tasks with a click or **Enter**
- Mark tasks as complete / incomplete
- Delete individual tasks
- Filter: **All**, **Active**, **Completed**
- Clear all completed tasks at once
- Persist tasks with `localStorage`
- Responsive layout for mobile and desktop
- Empty state when no tasks match the filter

## Tech Stack

- HTML5
- CSS3 (Flexbox, CSS variables, animations)
- JavaScript (ES6+, localStorage API)

No frameworks, no build step, no dependencies.

## Project Structure

```
todo-app/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Run Locally

```bash
git clone https://github.com/annavoy/todo-app.git
cd todo-app
open index.html
```

## Deploy to GitHub Pages

1. Repo **Settings → Pages**
2. Source: **Deploy from a branch** → `main` → `/ (root)`
3. Live at: `https://annavoy.github.io/todo-app/`

## License

MIT
