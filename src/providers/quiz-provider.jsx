import { QuizContext } from "@/context/quiz-context";
import { useTimer } from "@/hooks/use-timer";
import {
  decodeHtml,
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
  shuffleArray,
} from "@/libs/utils";
import React, { useCallback, useEffect, useState } from "react";

export default function QuizProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [questionCategories, setQuestionCategories] = useState([]);

  const [isQuestionsLoading, setIsQuestionsLoading] = useState(false);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);

  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  // Quiz State Progress
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Final Quiz State
  const [result, setResult] = useState(null);

  // Resume State
  const [hasSavedQuiz, setHasSavedQuiz] = useState(false);
  const [savedSession, setSavedSession] = useState(null);

  // ================= TIMER =================
  useTimer(isQuizActive, timeRemaining, setTimeRemaining, () => {
    completeQuiz();
  });

  // ================= LOAD CATEGORY =================
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsCategoryLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api_category.php`,
      );
      const data = await res.json();
      setQuestionCategories(data.trivia_categories);
    } finally {
      setIsCategoryLoading(false);
    }
  };

  // ================= CHECK SESSION (FIXED) =================
  useEffect(() => {
    const raw = getLocalStorage("quiz_session");

    if (raw) {
      const session = JSON.parse(raw);

      setHasSavedQuiz(true);
      setSavedSession(session);
    } else {
      setHasSavedQuiz(false);
      setSavedSession(null);
    }
  }, []);

  // ================= SAVE SESSION =================
  useEffect(() => {
    if (!isQuizActive) return;

    const session = {
      questions,
      answers,
      currentQuestionIndex,
      timeRemaining,
    };

    setLocalStorage("quiz_session", JSON.stringify(session));
    setHasSavedQuiz(true);
    setSavedSession(session);
  }, [questions, answers, currentQuestionIndex, timeRemaining, isQuizActive]);

  // ================= FETCH QUESTIONS =================
  const fetchQuestions = async ({
    amount = "10",
    category = "",
    difficulty = "",
    type = "",
  }) => {
    setIsQuestionsLoading(true);

    try {
      let url = `${import.meta.env.VITE_API_URL}/api.php?amount=${amount}`;
      if (category) url += `&category=${category}`;
      if (difficulty) url += `&difficulty=${difficulty}`;
      if (type) url += `&type=${type}`;

      const res = await fetch(url);
      const data = await res.json();

      const formatted = data.results.map((q, i) => ({
        id: i + 1,
        category: q.category,
        difficulty: q.difficulty,
        question: decodeHtml(q.question),
        options: shuffleArray([
          { text: decodeHtml(q.correct_answer), isCorrect: true },
          
          ...q.incorrect_answers.map((a) => ({
            text: decodeHtml(a),
            isCorrect: false,
          })),
        ]),
      }));

      setQuestions(formatted);
      return { success: true, message: "Selamat Mengerjakan Quiz" };
    } finally {
      setIsQuestionsLoading(false);
    }
  };

  // ================= START =================
  const startQuiz = (config) => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsQuizComplete(false);

    setTimeRemaining(config.duration * 60);
    setIsQuizActive(true);

    removeLocalStorage("quiz_session");
    setHasSavedQuiz(false);
    setSavedSession(null);
  };

  // ================= ANSWER =================
  const answerQuestion = (questionId, answer) => {
    const updated = {
      ...answers,
      [questionId]: answer,
    };

    setAnswers(updated);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((p) => p + 1);
    } else {
      completeQuiz(updated);
    }
  };

  // ================= RESULT =================
  const buildResult = useCallback(
    (answers) => {
      const values = Object.values(answers);

      const correct = values.filter((answer) => answer.isCorrect).length;
      const incorrect = values.length - correct;
      const unanswered = questions.length - values.length;

      const score =
        questions.length === 0
          ? 0
          : Math.round((correct / questions.length) * 100);

      return {
        score,
        correct,
        incorrect,
        answered: values.length,
        unanswered,
        total: questions.length,
        answers,
        questions,
        completedAt: new Date(),
        timeRemaining,
      };
    },
    [questions, timeRemaining],
  );

  const completeQuiz = useCallback(
    (answers = answers) => {
      setResult(buildResult(answers));

      setIsQuizActive(false);
      setIsQuizComplete(true);

      removeLocalStorage("quiz_session");
      setHasSavedQuiz(false);
      setSavedSession(null);
    },
    [answers, buildResult],
  );

  // ================= RESUME =================
  const resumeQuiz = () => {
    const raw = getLocalStorage("quiz_session");
    if (!raw) return false;

    const session = JSON.parse(raw);

    if (session.timeRemaining <= 0) {
      removeLocalStorage("quiz_session");
      return false;
    }

    setQuestions(session.questions);
    setAnswers(session.answers);
    setCurrentQuestionIndex(session.currentQuestionIndex);
    setTimeRemaining(session.timeRemaining);
    setIsQuizActive(true);
    setIsQuizComplete(false);
    setHasSavedQuiz(false);
    setSavedSession(null);
    return true;
  };

  // ================= RESET =================
  const resetQuiz = () => {
    removeLocalStorage("quiz_session");
    setQuestions([]);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTimeRemaining(0);
    setIsQuizActive(false);
    setIsQuizComplete(false);
    setResult(null);
    setHasSavedQuiz(false);
    setSavedSession(null);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        questionCategories,
        isQuestionsLoading,
        isCategoryLoading,
        currentQuestionIndex,
        answers,
        timeRemaining,
        isQuizActive,
        isQuizComplete,
        result,
        hasSavedQuiz,
        savedSession,
        fetchQuestions,
        startQuiz,
        answerQuestion,
        resumeQuiz,
        resetQuiz,
        completeQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
