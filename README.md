
# DOT Challenge — Quiz App

A React-based quiz application built as a technical assessment for the **DOT Frontend Engineer Internship** program.

---

# 🎯 Assessment Objectives

The application was developed to fulfill the following technical assessment requirements.

| No. | Assessment Requirement | Status | Implementation |
| :-- | :--------------------- | :----: | :------------- |
| 1 | Implement a user login feature. | ✅ | Users are required to log in by entering their name before starting the quiz. |
| 2 | Retrieve quiz questions from the Open Trivia DB API. | ✅ | Quiz questions are fetched dynamically from the Open Trivia DB API using configurable parameters. |
| 3 | Support a flexible number and type of questions. | ✅ | Users can customize the number of questions, category, difficulty, and question type before starting the quiz. |
| 4 | Display the total number of questions and the number of answered questions. | ✅ | A progress indicator is displayed throughout the quiz to show the user's current progress. |
| 5 | Implement a countdown timer for the quiz. | ✅ | A countdown timer is displayed during the quiz and automatically ends the session when the time expires. |
| 6 | Display only one question per page and automatically proceed to the next question after an answer is selected. | ✅ | Each page presents a single question, and selecting an answer immediately navigates to the next question. |
| 7 | Display quiz results when the timer expires. | ✅ | Once the quiz ends, the application displays the total correct answers, incorrect answers, answered questions, unanswered questions, and the final score. |
| 8 | Implement a quiz resume mechanism using Local Storage when the browser is closed. | ✅ | The application persists quiz progress, timer, selected answers, and current question index using Local Storage, allowing users to resume an unfinished quiz. |
| 9 | Upload the source code to GitHub. | ✅ | The project is managed with Git and hosted in a public GitHub repository. |

---


## 📌 Overview

DOT Challenge is a quiz web application that allows users to authenticate, configure a quiz session, and answer questions fetched from the [Open Trivia DB](https://opentdb.com) API. The app is designed around a one-question-per-page flow with a countdown timer, and it uses Local Storage to persist quiz progress — meaning users can close the browser and resume right where they left off.

**How it works:**

1. The user logs in (or registers automatically if it's their first time).
2. On the home page, they configure quiz parameters: category, difficulty, and number of questions.
3. Questions are fetched from the Open Trivia DB API and the quiz starts.
4. The user answers one question at a time. Selecting an answer automatically advances to the next question.
5. When all questions are answered — or the timer runs out — the app navigates to the result page, which shows the score and a full review of each question.
6. If the user exits mid-quiz, their progress is saved. On their next visit, a dialog will prompt them to resume or start fresh.

---

## ✨ Features

- User login & auto-registration via Local Storage
- Quiz configuration: category, difficulty, number of questions
- Questions fetched from Open Trivia DB API
- One question displayed per page with automatic navigation on answer
- Countdown timer that auto-submits the quiz on expiry
- Quiz progress indicator (question X of Y)
- Score calculation with correct, incorrect, and unanswered counts
- Result page with a pie chart and per-question review
- Resume unfinished quiz from Local Storage on re-entry
- Responsive layout

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (Radix UI primitives) |
| Charts | Recharts |
| Form Handling | React Hook Form |
| Validation | Zod |
| Icons | Lucide React |
| Font | Geist (via `@fontsource-variable/geist`) |
| API | Open Trivia DB (free, no key required) |

---

## ⚙️ System Requirements

- **Node.js** 18 or higher
- **npm** 9 or higher

---

## 🚀 Installation

**1. Clone the repository**

```bash
git clone https://github.com/PutuRivan/dot-intern-test.git
cd dot-intern-test
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Copy the example file and set the API base URL:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=https://opentdb.com
```

**4. Start the development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

**5. Build for production** *(optional)*

```bash
npm run build
```

---

## 🌐 Environment Variables

| Variable | Description | Example Value |
|---|---|---|
| `VITE_API_URL` | Base URL for the Open Trivia DB API | `https://opentdb.com` |

This is the only environment variable used. No API key is required — Open Trivia DB is a public, free API.

---

## 📁 Project Structure

```
dot-intern-test/
├── public/
├── src/
│   ├── components/
│   │   ├── home/
│   │   │   ├── header.jsx                   # Top navigation bar with user info and logout
│   │   │   ├── quiz-option-container.jsx    # Quiz configuration form (category, difficulty, amount)
│   │   │   └── resume-quiz-dialog.jsx       # Dialog to resume or discard a saved session
│   │   ├── quiz/
│   │   │   ├── quiz-header-container.jsx    # Displays current question index and countdown timer
│   │   │   └── quiz-question-container.jsx  # Renders question text and shuffled answer options
│   │   ├── result/
│   │   │   ├── pie-chart.jsx                # Recharts pie chart for score visualization
│   │   │   ├── question-review-card.jsx     # Individual question review with correct/wrong indicator
│   │   │   ├── question-review-container.jsx# List wrapper for all question review cards
│   │   │   ├── stats-card.jsx               # Single stat display (score, correct, incorrect, etc.)
│   │   │   └── stats-review-container.jsx   # Grid of stat cards shown on the result page
│   │   └── ui/                              # shadcn/ui base components (Button, Card, Dialog, etc.)
│   ├── context/
│   │   ├── auth-context.jsx                 # AuthContext definition (createContext)
│   │   └── quiz-context.jsx                 # QuizContext definition (createContext)
│   ├── hooks/
│   │   └── use-timer.js                     # Custom hook: countdown logic using setInterval + useRef
│   ├── libs/
│   │   ├── schema/
│   │   │   └── index.js                     # Zod schemas for login/register and quiz config forms
│   │   └── utils.js                         # Utilities: cn(), localStorage helpers, shuffleArray, formatTime, decodeHtml
│   ├── pages/
│   │   ├── auth/
│   │   │   └── login-page.jsx               # Login & register page (single form, auto-detect)
│   │   └── dashboard/
│   │       ├── home-page.jsx                # Post-login page: quiz config + resume dialog trigger
│   │       ├── quiz-page.jsx                # Active quiz page: question display + timer
│   │       └── result-page.jsx              # Score summary + full question review
│   ├── providers/
│   │   ├── auth-provider.jsx                # AuthContext provider: login, logout, user persistence
│   │   └── quiz-provider.jsx                # QuizContext provider: fetch, start, answer, resume, reset
│   ├── routes/
│   │   ├── index.jsx                        # Route definitions (createBrowserRouter)
│   │   └── protected-route.jsx              # Route guard: redirects unauthenticated users to /
│   ├── index.css                            # Global styles (Tailwind CSS directives)
│   └── main.jsx                             # Application entry point
├── .env
├── .env.example
├── .gitignore
├── components.json                          # shadcn/ui CLI configuration
├── index.html
├── jsconfig.json
├── package.json
└── vite.config.js
```

---

## 🏗 Architecture

The project follows a **Component-Based Architecture** with clear separation of concerns across layers:

### Component-Based Architecture
UI is broken into small, focused components. Page-level components (`pages/`) compose feature-specific components (`components/`), which in turn use base UI primitives from `components/ui/`.

### Context API for Global State
Two contexts handle shared state across the component tree:
- `AuthContext` — manages `user`, `login`, and `logout`.
- `QuizContext` — manages all quiz-related state: questions, answers, timer, result, and session persistence.

### Service Layer (in Provider)
API calls (`fetchQuestions`, `fetchCategories`) live inside `quiz-provider.jsx` rather than in components. This keeps components free of data-fetching logic.

### Custom Hook
`useTimer` encapsulates countdown logic using `setInterval` and `useRef` for stable callback references. It is consumed directly inside `QuizProvider`, so the timer lifecycle is tied to the quiz state.

### Schema & Validation Layer
`libs/schema/index.js` defines Zod schemas for form validation. They are consumed by React Hook Form via `@hookform/resolvers/zod`.

### Route Protection
`protected-route.jsx` acts as a Higher-Order Component (HOC) that reads `AuthContext` and redirects unauthenticated users back to the login page before rendering any child routes.

---

## 🗂 State Management

State is managed entirely via **React Context API** with `useState` hooks inside two providers:

### AuthProvider (`auth-provider.jsx`)

| State | Type | Description |
|---|---|---|
| `user` | `object \| null` | Currently logged-in user object |
| `isLoading` | `boolean` | True while checking localStorage on mount |

On mount, it reads the `user` key from Local Storage to restore sessions. Login and registration are both handled by a single `login()` function — if the username already exists in the `users` list in Local Storage, it performs a login; otherwise, it registers the user automatically.

### QuizProvider (`quiz-provider.jsx`)

| State | Type | Description |
|---|---|---|
| `questions` | `array` | Formatted questions fetched from the API |
| `questionCategories` | `array` | Available categories from the API |
| `currentQuestionIndex` | `number` | Index of the currently displayed question |
| `answers` | `object` | Map of `questionId → selectedAnswer` |
| `timeRemaining` | `number` | Remaining time in seconds |
| `isQuizActive` | `boolean` | Whether the quiz is currently running |
| `isQuizComplete` | `boolean` | Whether the quiz has been submitted |
| `result` | `object \| null` | Final result object (score, breakdown, answers) |
| `hasSavedQuiz` | `boolean` | Whether a saved session exists in Local Storage |
| `savedSession` | `object \| null` | The deserialized saved session object |

---

## 🔄 Application Flow

### Login
The user visits `/` and enters a username and password. The form is validated via Zod. If the username exists in `localStorage.users`, credentials are checked and the user is logged in. If not, the user is automatically registered and logged in. The session is persisted to `localStorage.user`.

### Fetch Questions
On the home page (`/home`), the user selects quiz parameters and submits. `fetchQuestions()` is called with the selected `amount`, `category`, and `difficulty`. The API response is decoded (HTML entities) and answer options are shuffled using `shuffleArray()`.

### Quiz
The quiz starts at question index `0`. Answering a question calls `answerQuestion()`, which records the answer and advances the index. On the last question, it calls `completeQuiz()` automatically.

### Timer
`useTimer` starts a `setInterval` when `isQuizActive` is `true`. Each tick decrements `timeRemaining` by 1. When it reaches `0`, `completeQuiz()` is called via a stable `useRef` callback to avoid stale closures.

### Result
`buildResult()` computes the final score as `(correct / total) * 100`, rounds it, and returns a result object including per-question answers for the review. The result page displays a pie chart and a list of each question with the user's answer highlighted.

### Resume Quiz
Every tick of the timer (and every state change while the quiz is active) triggers a `useEffect` that serializes the current quiz state to `localStorage.quiz_session`. On the home page load, if a saved session is detected, a dialog appears asking the user to resume or discard.

---

## 🌍 API Integration

This project uses the [Open Trivia DB](https://opentdb.com) public API. No authentication is required.

### Endpoints

| Endpoint | Description |
|---|---|
| `GET /api_category.php` | Fetch all available question categories |
| `GET /api.php` | Fetch quiz questions with configurable parameters |

### Question Fetch Parameters

| Parameter | Type | Description |
|---|---|---|
| `amount` | `number` | Number of questions (e.g., `10`) |
| `category` | `number` | Category ID (from `/api_category.php`) |
| `difficulty` | `string` | `easy`, `medium`, or `hard` |
| `type` | `string` | `multiple` or `boolean` (not exposed in UI, optional) |

**Example request:**

```
GET https://opentdb.com/api.php?amount=10&category=9&difficulty=medium
```

Questions from the API contain HTML-encoded entities (e.g., `&amp;`, `&#039;`). These are decoded on the client side using the `decodeHtml()` utility function, which uses a temporary `textarea` DOM element.

---

## 💾 Resume Quiz Mechanism

Quiz progress is continuously persisted to `localStorage` under the key `quiz_session` while a quiz is active. The session object contains:

```json
{
  "questions": [...],
  "answers": { "1": { "text": "Paris", "isCorrect": true }, ... },
  "currentQuestionIndex": 3,
  "timeRemaining": 247
}
```

**Save:** A `useEffect` in `QuizProvider` watches `[questions, answers, currentQuestionIndex, timeRemaining, isQuizActive]` and writes to Local Storage on every change while `isQuizActive` is `true`.

**Detect:** On mount, `QuizProvider` reads `quiz_session` from Local Storage. If found, `hasSavedQuiz` is set to `true` and the session is parsed into `savedSession`.

**Resume prompt:** When `HomePage` mounts and detects `hasSavedQuiz && savedSession`, it opens the `ResumeQuizDialog`. The user can choose to resume or discard.

**Resume:** `resumeQuiz()` reads the session, validates that `timeRemaining > 0`, restores all state, and sets `isQuizActive = true`. The timer resumes from where it was left off.

**Discard:** `resetQuiz()` clears `quiz_session` from Local Storage and resets all quiz state to initial values.

**Complete/Expire:** When the quiz finishes (either by answering all questions or timer expiry), `removeLocalStorage("quiz_session")` is called and `hasSavedQuiz` is reset to `false`.