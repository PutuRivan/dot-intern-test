# DOT Challenge - Quiz App

A React-based quiz application built for the DOT Frontend Internship Technical Assessment.

---

## 📌 Overview

DOT Challenge is a quiz application developed using React and Vite.

The application allows users to log in, answer quiz questions fetched from the Open Trivia DB API, complete the quiz within a time limit, and review their final score. The application also supports quiz state persistence using Local Storage, allowing users to resume an unfinished quiz after reopening the browser.

--- 

## ✨ Features

- User login
- Fetch quiz questions from Open Trivia DB
- One question displayed per page
- Automatic navigation after selecting an answer
- Countdown timer
- Quiz progress indicator
- Score calculation
- Quiz result page
- Resume unfinished quiz using Local Storage
- Responsive design

---

## 🛠 Tech Stack

- React
- Vite
- React Router
- Tailwind CSS
- Context API
- React Hook Form
- Zod
- Open Trivia DB API

---

## ⚙️ System Requirements

- Node.js 18+
- npm 9+

---

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PutuRivan/dot-intern-test.git
   cd dot-intern-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example environment file and fill in the required values:
   ```bash
   cp .env.example .env
   ```

   Then edit `.env`:
   ```env
   VITE_API_URL=https://opentdb.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

5. **Build for production** *(optional)*
   ```bash
   npm run build
   ```

---

## 🌐 Environment Variables

| Variable | Description |
|----------|-------------|
| VITE_API_URL | Open Trivia DB API URL |

---

## 📁 Project Structure

```
dot-intern-test/
├── public/
├── src/
│   ├── components/
│   │   ├── home/
│   │   │   ├── header.jsx                  # Navigation header
│   │   │   ├── quiz-option-container.jsx   # Quiz configuration form (category, difficulty, amount)
│   │   │   └── resume-quiz-dialog.jsx      # Dialog prompt to resume a saved session
│   │   ├── quiz/
│   │   │   ├── quiz-header-container.jsx   # Displays question index and timer
│   │   │   └── quiz-question-container.jsx # Renders question text and answer choices
│   │   ├── result/                         # Result-related UI components
│   │   └── ui/                             # shadcn/ui base components (Button, Card, etc.)
│   ├── context/
│   │   ├── auth-context.jsx                # Auth context definition
│   │   └── quiz-context.jsx                # Quiz context definition
│   ├── hooks/
│   │   └── use-timer.js                    # Custom hook for countdown timer logic
│   ├── libs/
│   │   ├── schema/                         # Zod validation schemas (login, register, quiz config)
│   │   └── utils.js                        # Utility functions (cn, etc.)
│   ├── pages/
│   │   ├── auth/
│   │   │   └── login-page.jsx              # Login & Register page
│   │   └── dashboard/
│   │       ├── home-page.jsx               # Quiz configuration page (post-login)
│   │       ├── quiz-page.jsx               # Active quiz page
│   │       └── result-page.jsx             # Score and result summary page
│   ├── providers/
│   │   ├── auth-provider.jsx               # AuthContext provider with localStorage logic
│   │   └── quiz-provider.jsx               # QuizContext provider with session persistence
│   ├── routes/
│   │   ├── index.jsx                       # Route definitions
│   │   └── protected-route.jsx             # HOC to guard authenticated routes
│   ├── index.css                           # Global styles (Tailwind directives)
│   └── main.jsx                            # Application entry point
├── .env
├── .env.example
├── .gitignore
├── components.json                         # shadcn/ui configuration
├── index.html
├── package.json
└── vite.config.js
```

---

